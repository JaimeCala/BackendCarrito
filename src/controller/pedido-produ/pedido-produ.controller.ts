import { Controller, Put, Param, ParseIntPipe, Body, NotFoundException, Delete, Post, Get } from '@nestjs/common';
import { PedidoProduService } from 'src/service/pedido-produ/pedido-produ.service';
import { PedidoProducto } from 'src/modules/pedido-produ/pedido-produ.entity';
import { Pedido } from 'src/modules/pedido/pedido.entity';

@Controller('pedido-produ')
export class PedidoProduController {

    
constructor(private service:PedidoProduService){}
    
    @Get('/pedidoproductos')
    async getPedidoProductos( ): Promise<PedidoProducto[]>{
        const pedidoproductos = await this.service.getPedidoProductos();
        return pedidoproductos;
        
    }
    @Get('/pedidoproductosmasvendidos')
    async getPedidoProductosMasvendido( ): Promise<PedidoProducto[]>{
        const pedidoproductos = await this.service.getPedidoProductosMasvendidos();
        return pedidoproductos;
        
    }

    @Get('/:id')
    async getPedidoProducto(@Param('id', ParseIntPipe) id: number): Promise<any>{
        const pedidoproducto = await this.service.getPedidoProducto( id);
        return pedidoproducto;
    }

    @Post('/create/:pedido')
    async createPedidoProducto(@Param('pedido', ParseIntPipe) pedido: Pedido,  @Body() pedidoproducto: PedidoProducto):Promise<PedidoProducto>{
        const createdPedidoProducto = await this.service.createPedidoProducto(pedido, pedidoproducto);
        return createdPedidoProducto;
    }


    /*@Post('/create')
    async createPedidoProducto(@Body() cart: string):Promise<PedidoProducto>{
        const createdPedidoProducto = await this.service.createPedidoProducto(cart);
        return createdPedidoProducto;
    }*/
    
    @Delete('/:id')
    async deletepedidoproducto(@Param('id', ParseIntPipe) id: number): Promise<void>{
        const pedidoproductodelete = await this.service.deletePedidoProducto(id);
        if(!pedidoproductodelete) throw new NotFoundException('No hay registro con ese id para eliminar');
        return pedidoproductodelete;

    }
    @Put('/:id')
    async updatepedidoproducto(@Param('id', ParseIntPipe) id: number , @Body() pedidoproducto: PedidoProducto): Promise<PedidoProducto>{
        const updatepedidoproducto = await this.service.updatePedidoProducto(id, pedidoproducto);
        return updatepedidoproducto;

    }
}
