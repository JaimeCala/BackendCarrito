import { Injectable, BadRequestException } from '@nestjs/common';
import { PedidoProduRepository } from 'src/modules/pedido-produ/pedido-produ.repository';
import { PedidoProducto } from 'src/modules/pedido-produ/pedido-produ.entity';
import { Pedido } from 'src/modules/pedido/pedido.entity';
import { getManager } from 'typeorm';
import { Producto } from '../../modules/producto/producto.entity';


import { Venta } from '../../modules/venta/venta.entity';

@Injectable()
export class PedidoProduService {
    constructor(private repository:PedidoProduRepository){}

        //show pedidoproductos
    async getPedidoProductos(): Promise<PedidoProducto[]>{
        const pedidoproductos: PedidoProducto[] = await this.repository.find({
            relations:['producto','pedido']
        });
        return pedidoproductos;
    }
    async getPedidoProductosMasvendidos(): Promise<PedidoProducto[]>{
        /*const pedidoproductos: PedidoProducto[] = await this.repository.find({
            relations:['producto','pedido']
        });
        return pedidoproductos;*/
        const ventas= await getManager()
                            .createQueryBuilder(PedidoProducto, "pedidoproducto")
                           
                            .select("SUM(pedidoproducto.cantidad)", "sumacantidad")
                           
                            .addSelect('producto.idproducto','idproducto')
                            .addSelect('producto.nombre','nombre')
                            .addSelect('venta.createdAt', 'createdAt')
                            .orderBy("sumacantidad", "DESC")
                            
                           
                            .groupBy("pedidoproducto.producto") 
                            .addGroupBy("producto.nombre")  
                            .addGroupBy("producto.idproducto")
                            .addGroupBy("venta.createdAt") 
                            
                            .innerJoin(Pedido,"pedido","pedido.idpedido = pedidoproducto.idpedido")
                            .innerJoin(Venta,"venta","venta.idpedido=pedido.idpedido")
                            .innerJoin(Producto,"producto","producto.idproducto = pedidoproducto.idproducto")
                           
                            .where('venta.estadopedido= :estadopedido',{estadopedido:'ENVIADO'})
                               
                            .getRawMany()

      return ventas
    }


    //mostrando un solo pedidoproducto
    async getPedidoProducto(idpedido: number): Promise<any>{
       /* if(!id){
            throw new BadRequestException('Necesita un id');
        }

        const pedidoproducto: PedidoProducto[] = await this.repository.find({
            relations:['producto','pedido'],
            where:{idpedidoproducto:id }
        });

        return pedidoproducto;*/

            if (!idpedido) {
                throw new BadRequestException('Necesita un id categoria');
            }
            const pedidoproduct= await getManager()
                                    .createQueryBuilder(PedidoProducto, "pedidoproducto")
                                    .addSelect('pedido.comentario', 'comentariopedido')
                                    .addSelect('pedido.idcliente', 'idcliente')
                                    .addSelect('producto.nombre','productonombre')
                                    .addSelect('pedidoproducto.idpedidoproducto','idpedidoproducto')
                                    .addSelect('pedidoproducto.cantidad','cantidad')
                                    .addSelect('pedidoproducto.idpedido','idpedido')
                                    .addSelect('pedidoproducto.idproducto','idproducto')
                                    .addSelect('pedidoproducto.precio_uni','precio_uni')
                                    .addSelect('pedidoproducto.precio_total','precio_total')
                                    .addSelect('pedidoproducto.oferta','oferta')
                                    .addSelect('pedidoproducto.porcentaje_des','porcentaje_des')
                                    //.addSelect('user.nombre','nombreuser')
                                    .innerJoin(Pedido,"pedido","pedido.idpedido = pedidoproducto.idpedido")
                                    .innerJoin(Producto,"producto","producto.idproducto=pedidoproducto.idproducto")
                                    
                                    //.innerJoin(Cliente,"cliente","cliente.idcliente = pedido.idcliente")
                                    //.innerJoin(User,"user","user.idusuario = cliente.idusuario")
                                    .where('pedido.idpedido= :idpedido',{idpedido:idpedido})
                                    .getRawMany()

            return pedidoproduct
    }


    
  

    async createPedidoProducto(pedido:Pedido, pedidoproducto: PedidoProducto): Promise<any>{

        //insertando el usuario que se registro ultimo
        /*const idpedido = await getRepository(Pedido).createQueryBuilder("pedido").select("MAX(pedido.idpedido)", "max");
        const maximo = await idpedido.getRawOne();
        const idpedidos = maximo.max;*/
        //const {pedido} = new PedidoProducto();
       
       
      
         for(const indice in pedidoproducto)
         {
            pedidoproducto.cantidad= pedidoproducto[indice].cantidad;
            pedidoproducto.producto = pedidoproducto[indice].producto;
            //pedidoproducto.pedido = pedidoproducto[indice].pedido;
            pedidoproducto.pedido= pedidoproducto[indice].pedido=pedido;//se suma +1 porque la consulta se realiza despues de la insercion
            //pedidoproducto.pedido= pedidoproducto[indice].pedido=maximo.max;
            //pedidoproducto.pedido = maximo.max;
            pedidoproducto.precio_uni = pedidoproducto[indice].precio_uni;
            pedidoproducto.precio_total = pedidoproducto[indice].precio_total;
            pedidoproducto.oferta = pedidoproducto[indice].produoferta;
            pedidoproducto.porcentaje_des = pedidoproducto[indice].produporcentaje;
            /* console.log("---------------------cantidad----------"+pedidoproducto.cantidad);
             console.log("---------------------producto----------"+pedidoproducto.producto);
             console.log("---------------------pedido----------"+pedidoproducto.pedido);
             console.log("---------------------precio_uni----------"+pedidoproducto.precio_uni);
             console.log("---------------------precio_total----------"+pedidoproducto.precio_total);*/
         
             await this.repository.save(pedidoproducto);
         }
         return pedidoproducto;
         
     
     

    }

    /*async createPedidoProducto(cart: string): Promise<any>{

        const pedidoproducto = new PedidoProducto();
        if(cart!=null)
        {
            console.log("---------------------probando----------"+cart);
        }else{console.log("no hay nadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");}
       
       const obj=  Object.keys(cart);

         for(const indice in obj)
         {
            pedidoproducto.cantidad= pedidoproducto[indice].cantidad;
            pedidoproducto.producto = pedidoproducto[indice].producto;
            pedidoproducto.pedido = pedidoproducto[indice].pedido;
             await this.repository.save(pedidoproducto);
         }
         return obj;
     
     

    }*/

    async deletePedidoProducto(id: number): Promise<any>{
        const deletePedidoProducto = await this.repository.delete(id);
        return  deletePedidoProducto;
        
        
    } 

    async updatePedidoProducto(id: number, pedidoproducto: PedidoProducto): Promise<any>{

        const updatePedidoProducto = await this.repository.update(id,pedidoproducto);
        return  updatePedidoProducto;

    }
}
