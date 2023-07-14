import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { UnidadProducRepository } from 'src/modules/unidad-produc/unidad-produc.repository';
import { UnidadProducto } from 'src/modules/unidad-produc/unidad-produc.entity';
import { getRepository } from 'typeorm';
import { Producto } from 'src/modules/producto/producto.entity';

@Injectable()
export class UnidadProducService {
    constructor(private repository:UnidadProducRepository){}

    //show unidadproductos
    async getUnidadProductos(): Promise<UnidadProducto[]>{
        const unidadproductos: UnidadProducto[] = await this.repository.find();
        return unidadproductos;
    }
    //mostrando un solo unidadproducto
    async getUnidadProducto(id: number): Promise<UnidadProducto>{
        if(!id){
            throw new BadRequestException('Necesita un id');
        }

        const unidadproducto: UnidadProducto = await this.repository.findOne(id);

        return unidadproducto;
    }
  

    async createUnidadProducto(unidadproducto: UnidadProducto): Promise<any>{

        

    
      /*  const producto = await getRepository(Producto)
        .createQueryBuilder('producto')
        .select('MAX(producto.idproducto)', 'max');
        const maximo = await producto.getRawOne();*/
        //asignando id de la producto

        unidadproducto.valor = unidadproducto.valor;
        unidadproducto.producto = unidadproducto.producto;
        return await this.repository.save(unidadproducto);

    }

    async deleteUnidadProducto(id: number): Promise<any>{
        const deleteUnidadProducto = await this.repository.delete(id);
        return  deleteUnidadProducto;
        
        
    } 

    async updateUnidadProducto(id: number, unidadproducto: UnidadProducto): Promise<any>{

        const updateUnidadProducto = await this.repository.update(id,unidadproducto);
        return  updateUnidadProducto;

    }

}
