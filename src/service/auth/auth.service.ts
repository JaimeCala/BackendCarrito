import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from 'src/modules/auth/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from 'src/modules/login/login.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from 'src/auth/jwt-payload.interface';

import { UserRepository } from 'src/modules/user/user.repository';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _userRepository: UserRepository,
    private readonly _jwtService: JwtService, //private readonly _mailerService: MailerService,
  ) {}

  //inicio de sesion

  async validateUser(login: Login): Promise<{ token: string; roles: string }> {
    const { username, password } = login;
    //verifica que haya el username
    const userLogin: Login = await this._authRepository.findOne({
      where: { username },
      relations: ['user'],
    });
    //console.log("---del login", userLogin);
    if (!userLogin) {
      throw new NotFoundException(
        'Tu usuario y contraseña es incorrecto o no existe',
      );
    }

    //compara password
    if (userLogin.user.estado == 'ACTIVO') {
      const isMatch = await compare(password, userLogin.password);

      if (!isMatch) {
        throw new UnauthorizedException('Usuario o contraseña incorrecta');
      }
    } else {
      throw new NotFoundException(
        'Tu usuario y contraseña es incorrecto o no existe',
      );
    }

    //const idusuarios;
    const idusuario = userLogin.user.idusuario;

    const userRole: User = await this._userRepository.findOne({
      where: { idusuario },
      relations: ['rol'],
    });

    //console.log(userRole);

    const payload: IJwtPayload = {
      idlogin: userLogin.idlogin,
      username: userLogin.username,
      role: userRole.rol.nombre,
      idusuario: userLogin.user.idusuario,
    };

    //generamos token
    const token = await this._jwtService.sign(payload);
    const roles = userRole.rol.nombre;

    return { token, roles };
  }

  async forgotPassword(id: number, login: Login): Promise<Login> {
    const forgotPass = await this._authRepository.update(id, login);

    return;
  }
}
