import { BadRequestException, Injectable } from '@nestjs/common';
import { Compra } from 'src/modules/compra/compra.entity';
import { CompraRepository } from 'src/modules/compra/compra.repository';


@Injectable()
export class CompraService {
    constructor(private repository:CompraRepository){}
     //Me entrega todos las compras
    async getCompras(): Promise<any> {
    const compra: Compra[] = await this.repository.find({
      //select:["nombre","paterno"],
      relations: ['proveedor'],
    });
    return compra;
    }

    async getComprasReport(): Promise<Compra[]> {
    const compra: Compra[] = await this.repository.find({
      //select:["nombre","paterno"],
      relations: ['proveedor', 'producto'],
    });
    return compra;
    }

    //Me entrega sola una compra especifica

    async getCompraId(idcompra: number): Promise<Compra> {
    if (!idcompra) {
      throw new BadRequestException('Necesita un id');
    }

    const compra: Compra = await this.repository.findOne({
      
      relations: ['proveedor'],
      where:{idcompra},
    });

    return compra;
    }

    async getCompraReportId(idcompra: number): Promise<Compra[]> {
    if (!idcompra) {
      throw new BadRequestException('Necesita un id');
    }

    const compra: Compra = await this.repository.findOne({
      
      relations: ['proveedor','producto'],
      where:{idcompra},
    });

    return [compra];
    }

    /*async postCompraes(idcategoria: number): Promise<any> {

    if (!idcategoria) {
      throw new BadRequestException('Necesita un id categoria');
    }
    const cate= await getManager()
                            .createQueryBuilder(Compra, "compra")
                            .addSelect('categoria.nombre', 'nombrecate')
                            .addSelect('compra.nombre','produnombre')
                            .addSelect('imgcompra.nombreimgprodu','imgprodu')
                            .innerJoin(Categoria,"categoria","categoria.idcategoria = compra.idcategoria")
                            .innerJoin(ImgCompra,"imgcompra","compra.idcompra=imgcompra.idcompra")
                            .where('categoria.idcategoria= :idcategoria',{idcategoria:idcategoria})
                            .getRawMany()

      return cate
   
    }*/

    //crea una nueva compra

    async createCompra(compra: Compra): Promise<Compra> {
    
    //---obteniendo el ultimo id registrado en producto---//
  /*  const producto = await getRepository(Producto)
      .createQueryBuilder('producto')
      .select('MAX(producto.idproducto)', 'max');
    const maximo = await producto.getRawOne();*/
    
    //----------insertando a compras despues de obtener el idproducto---//
    //compra.tipo_comprobante = compra.tipo_comprobante;
    //compra.num_comprobante = compra.num_comprobante;
    compra.cantidad_ingreso = compra.cantidad_ingreso;
    compra.observacion = compra.observacion;
    compra.fecha = compra.fecha;
    compra.hora = compra.hora;
    compra.precio_compra_uni = compra.precio_compra_uni;
    compra.precio_compra_total = compra.precio_compra_total;
    compra.producto =compra.producto;
    compra.proveedor = compra.proveedor;
   

    const savedCompra: Compra = await this.repository.save(compra);

    return savedCompra;
    }

    //Elimina una compra especifica

    async deleteCompra(id: number): Promise<any> {
    const deleteCompra = await this.repository.delete(id);
    return deleteCompra;
    }

    //actualiza una compra especifica

    async updateCompra(id: number, compra: Compra): Promise<any> {
    const updateCompra = await this.repository.update(id, compra);
    return updateCompra;
    }
}
