import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, } from '@nestjs/common';
import { Reclamo } from '../../modules/reclamos/reclamos.entity';
import { ReclamoService } from '../../service/reclamo/reclamo.service';

@Controller('reclamo')
export class ReclamoController {

    constructor(private service:ReclamoService){}

    /*@Post('/iconDrawer')
    async getUserIcon(@Body('email') email: string): Promise<User>{
        const userIcon = await this.service.getUserIcono(email);
        return userIcon;
    }*/

    //@UseGuards(AuthGuard())
    @Get('/reclamos')
    async getReclamos( ): Promise<Reclamo[]>{
        const reclamos = await this.service.getReclamos();
        return reclamos;
        
    }
    @Get('/reclamos/estado')
    async getReclamosEstado(): Promise<number>{
        const reclamos = await this.service.getReclamosEstado();
        return reclamos;
        
    }

   
    

    @Get('/:id')
    async getReclamoId(@Param('id', ParseIntPipe) id: number): Promise<Reclamo[]>{
        const reclamo = await this.service.getReclamoId( id);
        return reclamo;
    }

    @Post('/create')
    async createReclamo(@Body() reclamo: Reclamo):Promise<Reclamo>{
        const createdReclamo = await this.service.createReclamo(reclamo);
        return createdReclamo;
    }
   
    
    @Delete('/delete/:id')
    async deleteReclamo(@Param('id', ParseIntPipe) id: number): Promise<void>{
        const reclamodelete = await this.service.deleteReclamo(id);
        //if(!reclamodelete) throw new NotFoundException('No hay registro con ese id para eliminar');
        return reclamodelete;

    }
    /*@Put('/put/:id')
    async updateReclamo(@Param('id', ParseIntPipe) id: number , @Body() reclamo: Reclamo): Promise<Reclamo>{
        const updatereclamo = await this.service.updateReclamo(id, reclamo);
        return updatereclamo;

    }*/
}
