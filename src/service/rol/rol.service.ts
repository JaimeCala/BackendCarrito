import { Injectable, BadRequestException } from '@nestjs/common';
import { RolRepository } from 'src/modules/rol/rol.repository';
import { Rol } from 'src/modules/rol/rol.entity';
import { getManager, getRepository } from 'typeorm';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class RolService {
    constructor(private repository:RolRepository){}

    async getRoles(): Promise<any>{
        const roles: Rol[] = await this.repository.find({
            
        });
        return roles;

    

    }
    async getRolesUsuarios(): Promise<any>{
       /* const roles: Rol[] = await this.repository.find({
            relations: ['user'],
            where: {nombre: 'VENDEDOR'}
        });
        return roles;*/
        const rolesVendedor= await getManager()
                            .createQueryBuilder(Rol, "rol")
                            .addSelect('user.idusuario', 'idusuario')
                            .addSelect('user.nombre','nombre')
                            .addSelect('user.paterno','paterno')
                            
                            .innerJoin(User,"user","rol.idrol = user.rol")
                            
                            .where('rol.nombre= :nombre',{nombre:'VENDEDOR'})
                            .getRawMany()

      return rolesVendedor

    

    }
    async getRolesRepartidor(): Promise<any>{
      /*  const roles: Rol[] = await this.repository.find({
            relations: ['user'],
            where: {nombre: 'REPARTIDOR'}
        });
        return roles;*/

       
    const rolesRepartidor= await getManager()
                            .createQueryBuilder(Rol, "rol")
                            .addSelect('user.idusuario', 'idusuario')
                            .addSelect('user.nombre','nombre')
                            .addSelect('user.paterno','paterno')
                            
                            .innerJoin(User,"user","rol.idrol = user.rol")
                            
                            .where('rol.nombre= :nombre',{nombre:'REPARTIDOR'})
                            .getRawMany()

      return rolesRepartidor

    

    }

    async getRol(id: number): Promise<Rol>{
        if(!id){
            throw new BadRequestException('Necesita un id');
        }

        const rol: Rol = await this.repository.findOne(id);

        return rol;
    }

    async createRol(rol: Rol): Promise<Rol>{
        const savedRol: Rol = await this.repository.save(rol);
        return savedRol;
    }

    async deleteRol(id: number): Promise<any>{
        const deleterol = await this.repository.delete(id);
        return  deleterol;
        
        
    } 

    async updateRol(id: number, rol: Rol): Promise<any>{

        const updateRol = await this.repository.update(id,rol);
        return  updateRol;

    }
}
