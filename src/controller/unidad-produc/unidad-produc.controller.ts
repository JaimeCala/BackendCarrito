import { Controller, Get, Put, Delete, Param, ParseIntPipe, Body, NotFoundException, Post } from '@nestjs/common';
import { UnidadProducService } from 'src/service/unidad-produc/unidad-produc.service';
import { UnidadProducto } from 'src/modules/unidad-produc/unidad-produc.entity';

@Controller('unidad-produc')
export class UnidadProducController {
    constructor(private service:UnidadProducService){}

  
    @Get('/unidadproductos')
    async getUnidadProductos( ): Promise<UnidadProducto[]>{
        const unidadproductos = await this.service.getUnidadProductos();
        return unidadproductos;
        
    }

   
    

    @Get('/:id')
    async getUnidadProducto(@Param('id', ParseIntPipe) id: number): Promise<UnidadProducto>{
        const unidadproducto = await this.service.getUnidadProducto( id);
        return unidadproducto;
    }

    @Post('/create')
    async createUnidadProducto(@Body() unidadproducto: UnidadProducto):Promise<UnidadProducto>{
        const createdUnidadProducto = await this.service.createUnidadProducto(unidadproducto);
        return createdUnidadProducto;
    }

    @Delete('/:id')
    async deleteunidadproducto(@Param('id', ParseIntPipe) id: number): Promise<void>{
        const unidadproductodelete = await this.service.deleteUnidadProducto(id);
        if(!unidadproductodelete) throw new NotFoundException('No hay registro con ese id para eliminar');
        return unidadproductodelete;

    }
    @Put('/:id')
    async updateunidadproducto(@Param('id', ParseIntPipe) id: number , @Body() unidadproducto: UnidadProducto): Promise<UnidadProducto>{
        const updateunidadproducto = await this.service.updateUnidadProducto(id, unidadproducto);
        return updateunidadproducto;

    }

}
