import { Controller, Post, Delete, Put, Param, NotFoundException, ParseIntPipe, Body, Get } from '@nestjs/common';
import { Producto } from 'src/modules/producto/producto.entity';
import { ProductoService } from 'src/service/producto/producto.service';
import { PedidoProducto } from '../../modules/pedido-produ/pedido-produ.entity';

@Controller('producto')
export class ProductoController {


    constructor(private readonly service: ProductoService){}
  
    @Get('/productos')
    async getProductos( ): Promise<Producto[]>{
        const productos = await this.service.getProductos();
        return productos;
        
    }
    @Get('/productosOferta')
    async getProductosOferta( ): Promise<Producto[]>{
        const productos = await this.service.getProductosOferta();
        return productos;
        
    }
     @Get('/productosVencimiento')
    async getProductosVencimiento( ): Promise<Producto[]>{
        const productos = await this.service.getProductosVencimiento();
        return productos;
        
    }

    

    @Get('/:idproducto')
    async getProducto(@Param('idproducto', ParseIntPipe) idproducto: number): Promise<Producto>{
        const producto = await this.service.getProducto( idproducto);
        return producto;
    }

    /*@Post('/idcategoria')
    async getProducto(@Body('idcategoria') idcategoria: number): Promise<Producto>{
        const producto = await this.service.getProducto( idcategoria);
        return producto;
    }*/
    @Post('/idcateproduimg')
    async getProductoCate(@Body('idcategoria') idcategoria: number): Promise<Producto>{
        const producto = await this.service.postCateProduUniImg( idcategoria);
        return producto;
    }


    //crea producto

    @Post('/createProducto')
    async createProducto(@Body() producto: Producto):Promise<Producto>{
        const createdProducto = await this.service.createProducto(producto);
        return createdProducto;
    }

    @Delete('delete/:idproducto')
    async deleteproducto(@Param('idproducto', ParseIntPipe) idproducto: number): Promise<void>{
        const productodelete = await this.service.deleteProducto(idproducto);
        //if(!productodelete) throw new NotFoundException('No hay registro con ese idproducto para eliminar');
        return productodelete;

    }
    @Put('/:idproducto')
    async updateproducto(@Param('idproducto', ParseIntPipe) idproducto: number , @Body() producto: Producto): Promise<Producto>{
        const updateproducto = await this.service.updateProducto(idproducto, producto);
        return updateproducto;
    }
    @Post('/restaStock')
    async updateproductoStock( @Body() pedidoProducto: PedidoProducto): Promise<number>{

        
        const updateproducto = await this.service.updateProductoStock( pedidoProducto);
        return updateproducto;
    }

}
