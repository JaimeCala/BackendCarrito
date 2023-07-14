import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Repartidor } from '../../modules/repartidor/repartidor.entity';
import { RepartidorService } from '../../service/repartidor/repartidor.service';

@Controller('repartidor')
export class RepartidorController {
       constructor(private readonly service: RepartidorService){}
  
    @Get('/repartidores')
    async getRepartidores( ): Promise<Repartidor[]>{
        const Repartidors = await this.service.getRepartidores();
        return Repartidors;
        
    }

   
    

    @Get('/:idRepartidor')
    async getRepartidorId(@Param('idRepartidor', ParseIntPipe) idRepartidor: number): Promise<Repartidor>{
        const Repartidor = await this.service.getRepartidorId( idRepartidor);
        return Repartidor;
    }

    /*@Post('/idcategoria')
    async getRepartidor(@Body('idcategoria') idcategoria: number): Promise<Repartidor>{
        const Repartidor = await this.service.getRepartidor( idcategoria);
        return Repartidor;
    }*/
   /* @Post('/idcateproduimg')
    async getRepartidorCate(@Body('idcategoria') idcategoria: number): Promise<Repartidor>{
        const Repartidor = await this.service.postCateProduUniImg( idcategoria);
        return Repartidor;
    }*/


    //crea Repartidor

    @Post('/createRepartidor')
    async createRepartidor(@Body() Repartidor: Repartidor):Promise<Repartidor>{
        const createdRepartidor = await this.service.createRepartidor(Repartidor);
        return createdRepartidor;
    }

    @Delete('/:idRepartidor')
    async deleteRepartidor(@Param('idRepartidor', ParseIntPipe) idRepartidor: number): Promise<void>{
        const Repartidordelete = await this.service.deleteRepartidor(idRepartidor);
        if(!Repartidordelete) throw new NotFoundException('No hay registro con ese idRepartidor para eliminar');
        return Repartidordelete;

    }
    @Put('/:idRepartidor')
    async updateRepartidor(@Param('idRepartidor', ParseIntPipe) idRepartidor: number , @Body() Repartidor: Repartidor): Promise<Repartidor>{
        const updateRepartidor = await this.service.updateRepartidor(idRepartidor, Repartidor);
        return updateRepartidor;
    }
   /* @Put('enviado/:id')
    async updateRepartidorEnviado(@Param('id', ParseIntPipe) id: number ): Promise<Repartidor>{
        const updaterepartidor = await this.service.updateRepartidorEnviado(id);
        return updaterepartidor;

    }*/
}
