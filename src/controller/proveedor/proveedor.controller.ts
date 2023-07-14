import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Proveedor } from 'src/modules/proveedor/proveedor.entity';
import { ProveedorService } from 'src/service/proveedor/proveedor.service';

@Controller('proveedor')
export class ProveedorController {

    constructor(private readonly service: ProveedorService){}
  
    @Get('/proveedores')
    async getProveedors( ): Promise<Proveedor[]>{
        const proveedors = await this.service.getProveedors();
        return proveedors;
        
    }

   
    

    @Get('/:idproveedor')
    async getProveedor(@Param('idproveedor', ParseIntPipe) idproveedor: number): Promise<Proveedor>{
        const proveedor = await this.service.getProveedor( idproveedor);
        return proveedor;
    }

    /*@Post('/idcategoria')
    async getProveedor(@Body('idcategoria') idcategoria: number): Promise<Proveedor>{
        const proveedor = await this.service.getProveedor( idcategoria);
        return proveedor;
    }*/
    /*@Post('/idcateproduimg')
    async getProveedorCate(@Body('idcategoria') idcategoria: number): Promise<Proveedor>{
        const proveedor = await this.service.( idcategoria);
        return proveedor;
    }*/


    //crea proveedor

    @Post('/createProveedor')
    async createProveedor(@Body() proveedor: Proveedor):Promise<Proveedor>{
        const createdProveedor = await this.service.createProveedor(proveedor);
        return createdProveedor;
    }

    @Delete('delete/:idproveedor')
    async deleteproveedor(@Param('idproveedor', ParseIntPipe) idproveedor: number): Promise<void>{
        const proveedordelete = await this.service.deleteProveedor(idproveedor);
        //if(!proveedordelete) throw new NotFoundException('No hay registro con ese idproveedor para eliminar');
        return proveedordelete;

    }
    @Put('put/:idproveedor')
    async updateproveedor(@Param('idproveedor', ParseIntPipe) idproveedor: number , @Body() proveedor: Proveedor): Promise<Proveedor>{
        const updateproveedor = await this.service.updateProveedor(idproveedor, proveedor);
        return updateproveedor;
    }
}
