import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { LoginRepository } from 'src/modules/login/login.repository';
import { Login } from 'src/modules/login/login.entity';

import { genSalt, hash } from 'bcryptjs';
import { ResetPasswordDto } from 'src/modules/login/dto/reset-password.dto';

@Injectable()
export class LoginService {
  constructor(private repository: LoginRepository) {}

  /*async searchUsername(username: string ): Promise<Login>{
        const userpass=  await this.repository.find( loginusername.username ===username );

    }*/
  //Extrae username de la base de datos
  async searchUsername(username: string): Promise<Login[]> {
    const userpass = await this.repository.find({ where: { username } });
    return userpass;
  }

  //show logins
  async getLogins(): Promise<Login[]> {
    const logins: Login[] = await this.repository.find({ relations: ['user'] });
    return logins;
  }
  //mostrando un solo login
  async getLogin(id: number): Promise<Login> {
    if (!id) {
      throw new BadRequestException('Necesita un id');
    }

    const login: Login = await this.repository.findOne(id);

    return login;
  }

  async createLogin(login: Login): Promise<any> {
    const { username } = login;
    //extraemos o verificamos si el username existe
    const userExists = await this.repository.findOne({ where: { username } });
    if (userExists) {
      throw new ConflictException('Hay algún error');
    }

    login.user = login.user;
    //encriptando password y save
    const salt = await genSalt(10);
    login.password = await hash(login.password, salt);
    await this.repository.save(login);
  }

  async updateLogin(id: number, login: Login): Promise<any> {
    const updateLogin = await this.repository.update(id, login);
    return updateLogin;
  }

  async deleteLogin(id: number): Promise<any> {
    const deleteLogin = await this.repository.delete(id);
    return deleteLogin;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string> {
    const { resetPasswordToken, password } = resetPasswordDto;

    const login: Login = await this.searchFieldResetPassword(
      resetPasswordToken,
    );

    const salt = await genSalt(10);
    login.password = await hash(password, salt);
    login.resetPasswordToken = null;

    await this.repository.save(login);

    return 'Contraseña restablecida';
  }

  //TODO: buscar por campo resetPasswordToken
  async searchFieldResetPassword(resetPasswordToken: string): Promise<Login> {
    const login: Login = await this.repository.findOne({ resetPasswordToken });
    if (!login) {
      throw new NotFoundException();
    }
    return login;
  }
}
