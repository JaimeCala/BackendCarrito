import { BadRequestException, Injectable } from '@nestjs/common';
import { VentaRepository } from 'src/modules/venta/venta.repository';
import { getManager } from 'typeorm';
import { Cliente } from '../../modules/cliente/cliente.entity';
import { Pedido } from '../../modules/pedido/pedido.entity';
import { Repartidor } from '../../modules/repartidor/repartidor.entity';
import { User } from '../../modules/user/user.entity';
import { Vendedor } from '../../modules/vendedor/vendedor.entity';
import { Venta } from '../../modules/venta/venta.entity';

@Injectable()
export class VentaService {
    constructor(private repository: VentaRepository){}

     //Me entrega todos las Ventas
  async getVentas(): Promise<any> {
    /*const Venta: Venta[] = await this.repository.find({
      //select:["nombre","paterno"],
      //relations: ['imgVentas','unidadVentas','categoria','compra'],
    });
    return Venta;*/
    
    const ventas= await getManager()
                            .createQueryBuilder(Venta, "venta")
                            .addSelect('venta.idventa', 'idventa')
                            .addSelect('pedido.idpedido', 'idpedido')
                            .addSelect('pedido.precio','precio')
                            .addSelect('user.idusuario','idusuariovendedor')
                            .addSelect('user.nombre','nombrevendedor')
                            .addSelect('user.paterno', 'paternovendedor')
                            //.addSelect('user.materno','maternovendedor')
                            .addSelect('user.celular','celularvendedor')
                            .addSelect('cliente.idusuario', 'idusuariocliente')
                            .addSelect('repartidor.idusuario','idusuariorepartidor')   
                            .addSelect('repartidor.fecha','fecha')               
                            .innerJoin(Pedido,"pedido","pedido.idpedido = venta.idpedido")
                            .innerJoin(Vendedor,"vendedor","vendedor.idvendedor=venta.idvendedor")
                            .innerJoin(User,"user","user.idusuario = vendedor.idusuario" || "user.idusuario = repartidor.idusuario")
                            .innerJoin(Repartidor,"repartidor","repartidor.idpedido = pedido.idpedido" )
                            .innerJoin(Cliente,"cliente","cliente.idcliente=pedido.idcliente" || "cliente.idusuario = user.idusuario")
                            .where('venta.estadopedido= :estadopedido',{estadopedido:'ENVIADO'})
                            .getRawMany()

      return ventas
   
    

  }

  //Me entrega sola una Venta especifica

  async getVentaId(idventa: number): Promise<Venta> {

    console.log("llegando hasta aqui", idventa);
    if (!idventa) {
      throw new BadRequestException('Necesita un id');
    }

    const venta: Venta = await this.repository.findOne({
      
      //relations: ['imgVentas','unidadVentas','categoria','compra','proveedor'],
      where:{idventa},
    });

    return venta;
  }

  /*async postCateProduUniImg(idcategoria: number): Promise<any> {

    if (!idcategoria) {
      throw new BadRequestException('Necesita un id categoria');
    }
    const cate= await getManager()
                            .createQueryBuilder(Producto, "producto")
                            .addSelect('categoria.nombre', 'nombrecate')
                            .addSelect('producto.nombre','produnombre')
                            .addSelect('imgproducto.nombreimgprodu','imgprodu')
                            .innerJoin(Categoria,"categoria","categoria.idcategoria = producto.idcategoria")
                            .innerJoin(ImgProducto,"imgproducto","producto.idproducto=imgproducto.idproducto")
                            .where('categoria.idcategoria= :idcategoria',{idcategoria:idcategoria})
                            .getRawMany()

      return cate
   
    }*/

  //crea una nueva Venta

  async createVenta(venta: Venta): Promise<Venta> {

   venta.vendedor = venta.vendedor;
   venta.pedido = venta.pedido;
   venta.observacion = venta.observacion;
   venta.estadopedido = venta.estadopedido;
   

    const savedVenta: Venta = await this.repository.save(venta);

    return savedVenta;
  }

  //Elimina una Venta especifica

  async deleteVenta(id: number): Promise<any> {
    const deleteVenta = await this.repository.delete(id);
    return deleteVenta;
  }

  //actualiza una Venta especifica

  async updateVenta(id: number, venta: Venta): Promise<any> {
    const updateVenta = await this.repository.update(id, venta);
    return updateVenta;
  }
}
