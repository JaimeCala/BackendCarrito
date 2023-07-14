import { Controller, Post, Body, Get, Param, Delete, Put, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { RolService } from 'src/service/rol/rol.service';
import { Rol } from 'src/modules/rol/rol.entity';

@Controller('rol')
export class RolController {
    constructor(private service: RolService){}

    @Get('/roles')
    async getRoles(): Promise<Rol[]>{
        const roles = await this.service.getRoles();
        return roles;
    }
    @Get('/rolesUsers')
    async getRolesUsuarios(): Promise<Rol[]>{
        const roles = await this.service.getRolesUsuarios();
        return roles;
    }
    @Get('/rolesRepartidor')
    async getRolesRepartidor(): Promise<Rol[]>{
        const roles = await this.service.getRolesRepartidor();
        return roles;
    }

    @Get('/:id')
    async getRol(@Param('id', ParseIntPipe) id: number): Promise<Rol>{
        const role = await this.service.getRol( id);
        return role;
    }

    @Post('/create')
    async createRoles(@Body() rol:Rol):Promise<Rol>{
        const createdRoles = await this.service.createRol(rol);
        return createdRoles;
    }

    @Delete('/:id')
    async deleteroles(@Param('id', ParseIntPipe) id: number): Promise<void>{
        const roldelete = await this.service.deleteRol(id);
        if(!roldelete) throw new NotFoundException('No hay registro con ese id para eliminar');
        return roldelete;

    }
    @Put('/:id')
    async updateRoles(@Param('id', ParseIntPipe) id: number , @Body() rol: Rol): Promise<Rol>{
        const updaterole = await this.service.updateRol(id, rol);
        return updaterole;

    }


    
    


}
