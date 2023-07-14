import { Controller, Get, Post, Delete, Put, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { Categoria } from '../../modules/categoria/categoria.entity';
import { CategoriaService } from '../../service/categoria/categoria.service';


@Controller('categoria')
export class CategoriaController {

    constructor(private readonly service: CategoriaService){}
  
    @Get('/categorias')
    async getCategorias( ): Promise<Categoria[]>{
        const categorias = await this.service.getCategorias();
        return categorias;
        
    }

   
    

    @Get('/:idcategoria')
    async getCategoria(@Param('idcategoria', ParseIntPipe) idcategoria: number): Promise<Categoria>{
        const categoria = await this.service.getCategoria( idcategoria);
        return categoria;
    }

    //traemos las tablas relacionadas, producto, unidadproducto,imgproducto
    @Post('/idcateprodu')
    async getProducto(@Body('idcategoria') idcategoria: number): Promise<Categoria>{
        const producto = await this.service.postCateProdu( idcategoria);
        return producto;
    }


    //crea categoria
    
    @Post('/createCategoria')
    async createCategoria(@Body() categoria: Categoria ):Promise<Categoria>{
        const createdCategoria = await this.service.createCategoria(categoria);
        return createdCategoria;
       
    }

    @Delete('delete/:idcategoria')
    async deletecategoria(@Param('idcategoria', ParseIntPipe) idcategoria: number): Promise<void>{
        const categoriadelete = await this.service.deleteCategoria(idcategoria);
        //if(!categoriadelete) throw new NotFoundException('No hay registro con ese idcategoria para eliminar');
        return categoriadelete;

    }
    @Put('/:idcategoria')
    async updatecategoria(@Param('idcategoria', ParseIntPipe) idcategoria: number , @Body() categoria: Categoria): Promise<Categoria>{
        const updatecategoria = await this.service.updateCategoria(idcategoria, categoria);
        return updatecategoria;
    }
    
}
