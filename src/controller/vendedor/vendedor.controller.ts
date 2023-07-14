import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Vendedor } from '../../modules/vendedor/vendedor.entity';
import { VendedorService } from '../../service/vendedor/vendedor.service';

@Controller('vendedor')
export class VendedorController {
       constructor(private readonly service: VendedorService){}
  
    @Get('/vendedores')
    async getVendedor( ): Promise<Vendedor[]>{
        const Vendedors = await this.service.getVendedor();
        return Vendedors;
        
    }

   
    

    @Get('/:idVendedor')
    async getVendedorId(@Param('idVendedor', ParseIntPipe) idvendedor: number): Promise<Vendedor>{
        const vendedor = await this.service.getVendedorId( idvendedor);
        return vendedor;
    }

    /*@Post('/idcategoria')
    async getVendedor(@Body('idcategoria') idcategoria: number): Promise<Vendedor>{
        const Vendedor = await this.service.getVendedor( idcategoria);
        return Vendedor;
    }*/
    /*@Post('/idcateproduimg')
    async getVendedorCate(@Body('idcategoria') idcategoria: number): Promise<Vendedor>{
        const Vendedor = await this.service.postCateProduUniImg( idcategoria);
        return Vendedor;
    }*/


    //crea Vendedor

    @Post('/createVendedor')
    async createVendedor(@Body() Vendedor: Vendedor):Promise<Vendedor>{
        const createdVendedor = await this.service.createVendedor(Vendedor);
        return createdVendedor;
    }

    @Delete('/:idVendedor')
    async deleteVendedor(@Param('idVendedor', ParseIntPipe) idVendedor: number): Promise<void>{
        const Vendedordelete = await this.service.deleteVendedor(idVendedor);
        if(!Vendedordelete) throw new NotFoundException('No hay registro con ese idVendedor para eliminar');
        return Vendedordelete;

    }
    @Put('/:idVendedor')
    async updateVendedor(@Param('idVendedor', ParseIntPipe) idVendedor: number , @Body() Vendedor: Vendedor): Promise<Vendedor>{
        const updateVendedor = await this.service.updateVendedor(idVendedor, Vendedor);
        return updateVendedor;
    }
}
