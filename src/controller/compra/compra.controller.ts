import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Compra } from 'src/modules/compra/compra.entity';
import { CompraService } from 'src/service/compra/compra.service';

@Controller('compra')
export class CompraController {

    constructor(private readonly service: CompraService){}
  
    @Get('/compras')
    async getCompras( ): Promise<Compra[]>{
        const compras = await this.service.getCompras();
        return compras;
        
    }
    @Get('/comprasReporte')
        async getComprasReport( ): Promise<Compra[]>{
            const compras = await this.service.getComprasReport();
            return compras;
            
        }
    @Get('/:idcompra')
    async getCompraId(@Param('idcompra', ParseIntPipe) idcompra: number): Promise<Compra>{
        const compra = await this.service.getCompraId( idcompra);
        return compra;
    }
    

    @Get('report/:idcompraReport')
    async getCompraReportId(@Param('idcompraReport', ParseIntPipe) idcompra: number): Promise<Compra[]>{
        const compra = await this.service.getCompraReportId( idcompra);
        return compra;
    }

    /*@Post('/idcategoria')
    async getCompra(@Body('idcategoria') idcategoria: number): Promise<Compra>{
        const compra = await this.service.getCompra( idcategoria);
        return compra;
    }*/
    /*@Post('/idcateproduimg')
    async getCompraCate(@Body('idcategoria') idcategoria: number): Promise<Compra>{
        const compra = await this.service.( idcategoria);
        return compra;
    }*/


    //crea compra

    @Post('/createCompra')
    async createCompra(@Body() compra: Compra):Promise<Compra>{
        const createdCompra = await this.service.createCompra(compra);
        return createdCompra;
    }

    @Delete('/:idcompra')
    async deletecompra(@Param('idcompra', ParseIntPipe) idcompra: number): Promise<void>{
        const compradelete = await this.service.deleteCompra(idcompra);
        if(!compradelete) throw new NotFoundException('No hay registro con ese idcompra para eliminar');
        return compradelete;

    }
    @Put('put/:idcompra')
    async updatecompra(@Param('idcompra', ParseIntPipe) idcompra: number , @Body() compra: Compra): Promise<Compra>{
        const updatecompra = await this.service.updateCompra(idcompra, compra);
        return updatecompra;
    }
}
