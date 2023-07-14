import { BadRequestException, Injectable } from '@nestjs/common';
import { RepartidorRepository } from 'src/modules/repartidor/repartidor.repository';
import { Repartidor } from '../../modules/repartidor/repartidor.entity';

@Injectable()
export class RepartidorService {
     constructor(private repository:RepartidorRepository){}

     //Me entrega todos las Repartidors
  async getRepartidores(): Promise<any> {
    const Repartidor: Repartidor[] = await this.repository.find({
      //select:["nombre","paterno"],
      //relations: ['imgRepartidors','unidadRepartidors','categoria','compra'],
    });
    return Repartidor;
  }

  //Me entrega sola una Repartidor especifica

  async getRepartidorId(idrepartidor: number): Promise<Repartidor> {
    if (!idrepartidor) {
      throw new BadRequestException('Necesita un id');
    }

    const Repartidor: Repartidor = await this.repository.findOne({
      
      //relations: ['imgRepartidors','unidadRepartidors','categoria','compra','proveedor'],
      where:{idrepartidor},
    });

    return Repartidor;
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

  //crea una nueva Repartidor

  async createRepartidor(Repartidor: Repartidor): Promise<Repartidor> {

   Repartidor.fecha = Repartidor.fecha;
   Repartidor.hora = Repartidor.hora;
   Repartidor.user = Repartidor.user;
   Repartidor.pedidos = Repartidor.pedidos;
   Repartidor.estado = Repartidor.estado;
   

    const savedRepartidor: Repartidor = await this.repository.save(Repartidor);

    return savedRepartidor;
  }

  //Elimina una Repartidor especifica

  async deleteRepartidor(id: number): Promise<any> {
    const deleteRepartidor = await this.repository.delete(id);
    return deleteRepartidor;
  }

  //actualiza una Repartidor especifica

  async updateRepartidor(id: number, Repartidor: Repartidor): Promise<any> {
    const updateRepartidor = await this.repository.update(id, Repartidor);
    return updateRepartidor;
  }
  
 /* async updateRepartidorEnviado(id: number): Promise<any>{

        const  repartidor = new Repartidor();
        const estadoAbierto = 'ENVIADO'
        //const resultEstado = await this.repository.findOne(id,{where:{estado:estadoAbierto}});

        //if(resultEstado){
           // return;
        //}else{
            repartidor.estado = estadoAbierto;
  
            const updateRepartidor = await this.repository.update(id,repartidor);
            return  updateRepartidor;
        //}
        
        

    }*/
}
