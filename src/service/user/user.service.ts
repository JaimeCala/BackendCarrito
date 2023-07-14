import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/user.repository';
import { User } from 'src/modules/user/user.entity';
import { getManager, getRepository } from 'typeorm';
import { Rol } from 'src/modules/rol/rol.entity';
import { Login } from 'src/modules/login/login.entity';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async getUserIcono(email: string): Promise<any>{

   const user = await this.repository.findOne({where:{email}}); 

    
    return user;

  }

  async getUsers(): Promise<any> {
    const users: User[] = await this.repository.find({
      //select:["nombre","paterno"],
      relations: ['logins','rol'],
      where: {estado:'ACTIVO'}
    });
    return users;


  }

  async getUser(id: number): Promise<User[]> {
    if (!id) {
      throw new BadRequestException('Necesita un id');
    }

    const user: User = await this.repository.findOne(id);

    return [user];
  }
 

  async createUser(user: User): Promise<User> {
    //probar si existe el usuario en la base de datos
    const { ci } = user;
    const existsUser = await this.repository.findOne({where: {ci}});
    
    if (!existsUser) {
      const repo = await getRepository(Rol);
      const defaulRole = await repo.findOne({ where: { nombre: 'CLIENTE' } });
      user.rol = defaulRole;
      const savedUser: User = await this.repository.save(user);

      return savedUser;
    }
    else{
      throw new BadRequestException("El usuario ya existe");
    }
  }
  async createUserFrontend(user: User): Promise<User> {
    //probar si existe el usuario en la base de datos
    const { ci } = user;
    const existsUser = await this.repository.findOne({where: {ci , estado:'ACTIVO'}});
    
    if (!existsUser) {

      
      
      user.rol = user.rol;
      const savedUser: User = await this.repository.save(user);

      return savedUser;
      return
    }
    else{
       throw new BadRequestException("El usuario ya existe");
       
    }
  }


  async deleteUser(iduser: number): Promise<any> {
   /* const deleteUser = await this.repository.findOne(id);
    deleteUser.estado = 'INACTIVO'
    this.repository.save(deleteUser);
    return console.log("Usuario Inactivo");*/

    const usuario = new User();
    usuario.estado = 'INACTIVO';
    const deleteUser = await this.repository.update(iduser,usuario);
    return deleteUser;
  }

  async updateUser(id: number, user: User): Promise<any> {
    const updateUser = await this.repository.update(id, user);
    return updateUser;
  }
}
