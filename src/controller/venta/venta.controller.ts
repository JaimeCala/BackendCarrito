import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Venta } from '../../modules/venta/venta.entity';
import { VentaService } from '../../service/venta/venta.service';

@Controller('venta')
export class VentaController {
       constructor(private readonly service: VentaService){}
  
    @Get('/ventas')
    async getVentas( ): Promise<Venta[]>{
        const Ventas = await this.service.getVentas();
        return Ventas;
        
    }

   
    

    @Get('/:idventa')
    async getVenta(@Param('idventa', ParseIntPipe) idVenta: number): Promise<Venta>{
        
        const Venta = await this.service.getVentaId( idVenta);
        return Venta;
    }

    /*@Post('/idcategoria')
    async getVenta(@Body('idcategoria') idcategoria: number): Promise<Venta>{
        const Venta = await this.service.getVenta( idcategoria);
        return Venta;
    }*/
    /*@Post('/idcateproduimg')
    async getVentaCate(@Body('idcategoria') idcategoria: number): Promise<Venta>{
        const Venta = await this.service.postCateProduUniImg( idcategoria);
        return Venta;
    }*/


    //crea Venta

    @Post('/createVenta')
    async createVenta(@Body() Venta: Venta):Promise<Venta>{
        const createdVenta = await this.service.createVenta(Venta);
        return createdVenta;
    }

    @Delete('/:idVenta')
    async deleteVenta(@Param('idVenta', ParseIntPipe) idVenta: number): Promise<void>{
        const Ventadelete = await this.service.deleteVenta(idVenta);
        if(!Ventadelete) throw new NotFoundException('No hay registro con ese idVenta para eliminar');
        return Ventadelete;

    }
    @Put('/:idVenta')
    async updateVenta(@Param('idVenta', ParseIntPipe) idVenta: number , @Body() Venta: Venta): Promise<Venta>{
        const updateVenta = await this.service.updateVenta(idVenta, Venta);
        return updateVenta;
    }
}
