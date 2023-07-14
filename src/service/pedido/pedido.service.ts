import { Injectable, BadRequestException } from '@nestjs/common';
import { PedidoRepository } from 'src/modules/pedido/pedido.repository';
import { Pedido } from 'src/modules/pedido/pedido.entity';
import { getManager } from 'typeorm';
import { Cliente } from '../../modules/cliente/cliente.entity';
import { User } from '../../modules/user/user.entity';


@Injectable()
export class PedidoService {
    constructor(private repository:PedidoRepository){}

        //show pedidos
    async getPedidos(): Promise<Pedido[]>{

        
        const pedidos: Pedido[] = await this.repository.find({
            where:[{estado: 'ENVIADO'},{estado:'ESPERA'}],
            
            order: {idpedido: 'DESC'}
        });
        return pedidos;
        
    }
    async getPedidosEsperaCount(): Promise<number>{
        const pedidos: number = await this.repository.count({
            where: {estado: 'ESPERA'}
        });
        return pedidos;
        
    }
    //mostrando un solo pedido
    async getPedido(id: number): Promise<Pedido>{
        if(!id){
            throw new BadRequestException('Necesita un id');
        }

        const pedido: Pedido = await this.repository.findOne(id);

        return pedido;
    }

      //mostrando un solo pedido
    async getPedidoRealizados(idusuario: number): Promise<Pedido[]>{
        if(!idusuario){
            throw new BadRequestException('Necesita un idusuario');
        }

        
            const pedidoscli= await getManager()
                                    .createQueryBuilder(Pedido, "pedido")
                                    .addSelect('pedido.idpedido', 'idpedido')
                                    .addSelect('pedido.comentario','comentario')
                                    .addSelect('pedido.precio','precio')
                                    .addSelect('pedido.fecha','fecha')
                                    .addSelect('pedido.hora','hora')
                                    .addSelect('pedido.estado','estado')
                                    .orderBy("fecha","DESC")
                                    .addOrderBy("hora","DESC")
                                    .innerJoin(Cliente,"cliente","cliente.idcliente = pedido.idcliente")
                                    .innerJoin(User,"user","user.idusuario = cliente.idusuario")
                                    .where('user.idusuario = :idusuario',{idusuario:idusuario})
                                    .getRawMany()

            return pedidoscli
    
    }
  

    async createPedido(pedidos: Pedido, imgnombre:string , imglink:string  ): Promise<any>{

       
        const pedido = new Pedido();
        
        console.log("----------------SE VA INSERTAR DATOS A PEDIDOS-------------");
        pedido.cliente= pedidos.cliente;
        pedido.latitud = pedidos.latitud;
        pedido.longitud = pedidos.longitud;
        pedido.comentario = pedidos.comentario;
        pedido.direccion = pedidos.direccion;
        pedido.precio = pedidos.precio;
        pedido.fecha = pedidos.fecha;
        pedido.hora = pedidos.hora;
        
        pedido.nombrefilepdf = imgnombre;
        pedido.linkfilepdf = imglink;
        
        const pedidoprodu= await this.repository.save(pedido);
        console.log("----------------se insertooo-------------"+pedidoprodu.idpedido);
        return pedidoprodu;
       

    }
    async createPedidoAndPDF(pedido: Pedido, imgnombre: string, imglink: string): Promise<any>{

                

        console.log(imgnombre);
        pedido.cliente= pedido.cliente;
        pedido.nombrefilepdf = imgnombre;
        pedido.linkfilepdf = imglink;
        //const pedidoprodu= await this.repository.save(pedido);
        console.log(imglink);
        console.log(pedido);
        return 
       

    }

    async deletePedido(id: number): Promise<any>{

        const  pedido = new Pedido();
        const estadoEliminado = 'ELIMINADO'
        //const resultEstado = await this.repository.findOne(id,{where:{estado:estadoAbierto}});

        //if(resultEstado){
           // return;
        //}else{
            pedido.estado = estadoEliminado;
  
            const deletePedido = await this.repository.update(id,pedido);
            return  deletePedido;
        //}

        
        
    } 

    async updatePedido(id: number): Promise<any>{

        const  pedido = new Pedido();
        const estadoAbierto = 'ABIERTO'
        const resultEstado = await this.repository.findOne(id,{where:{estado:estadoAbierto}});

        if(resultEstado){
            return;
        }else{
            pedido.estado = estadoAbierto;
  
            const updatePedido = await this.repository.update(id,pedido);
            return  updatePedido;
        }
        
        

    }
     async updatePedidoEnviado(id: number): Promise<any>{

        const  pedido = new Pedido();
        const estadoAbierto = 'ENVIADO'
        //const resultEstado = await this.repository.findOne(id,{where:{estado:estadoAbierto}});

        //if(resultEstado){
           // return;
        //}else{
            pedido.estado = estadoAbierto;
  
            const updatePedido = await this.repository.update(id,pedido);
            return  updatePedido;
        //}
        
        

    }
}
