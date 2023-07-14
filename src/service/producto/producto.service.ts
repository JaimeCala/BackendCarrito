import { Injectable, BadRequestException } from '@nestjs/common';
import { ProductoRepository } from 'src/modules/producto/producto.repository';
import { Producto } from 'src/modules/producto/producto.entity';
import { getManager } from 'typeorm';
import { CategoriaService } from '../categoria/categoria.service';
import { Categoria } from 'src/modules/categoria/categoria.entity';
import { ImgProducto } from 'src/modules/img-producto/img-producto.entity';
import { PedidoProducto } from '../../modules/pedido-produ/pedido-produ.entity';
import * as moment from 'moment';
import { Moment } from 'moment';
import { UnidadProducto } from '../../modules/unidad-produc/unidad-produc.entity';
const momento = moment;

//const myMoment: moment.Moment = moment("someDate");

@Injectable()
export class ProductoService {
    constructor(private repository:ProductoRepository){}

     //Me entrega todos las productos
  async getProductos(): Promise<any> {
    const producto: Producto[] = await this.repository.find({
      //select:["nombre","paterno"],
      relations: ['imgproductos','unidadproductos','categoria','compra'],
      where: {estado: 'ACTIVO'},
    });
    return producto;
  }
  /*async getProductosOferta(): Promise<any> {
    const producto: Producto[] = await this.repository.find({
      //select:["nombre","paterno"],
      relations: ['imgproductos','unidadproductos','categoria','compra'],
      where: {oferta : 'SI'}
    });
    return producto;
  }*/

  async getProductosOferta(): Promise<any> {


   
    const cate= await getManager()
                            .createQueryBuilder(Producto, "producto")
                            //.addSelect('categoria.nombre', 'nombrecate')
                            .addSelect('producto.idproducto','idprodu')
                            .addSelect('producto.nombre','produnombre')
                            .addSelect('producto.precio','produprecio')
                            .addSelect('producto.peso','produpeso')
                            .addSelect('producto.oferta', 'produoferta')
                            .addSelect('producto.porcentaje','produporcentaje')
                            .addSelect('producto.descripcion', 'produdescripcion')
                            .addSelect('imgproducto.idimgproducto','imgidprodu')
                            .addSelect('imgproducto.nombreimgprodu','imgnombreprodu')
                            .addSelect('unidadprodu.idunidadproducto','iduniprodu')
                            .addSelect('unidadprodu.valor','univalor')
                            //.innerJoin(Producto,"producto","categoria.idcategoria =producto.idcategoria")
                            .innerJoin(ImgProducto,"imgproducto","producto.idproducto=imgproducto.idproducto")
                            .innerJoin(UnidadProducto,"unidadprodu","producto.idproducto=unidadprodu.idproducto")
                            .where('producto.oferta= :oferta',{oferta:"SI"})
                            .getRawMany()

      return cate
  
    }


  async getProductosVencimiento(): Promise<any> {
   /* const producto: Producto[] = await this.repository.find({ 
    return producto;
          });*/
        const  fechahoy = new Date();
        const suma= moment(new Date(fechahoy)).add(10, 'days').format('YYYY-MM-DD'); 
        const produvence= await getManager()
                                  .createQueryBuilder(Producto, "producto")
                                  .addSelect('producto.vencimiento', 'vencimiento')
                              
                                  //.where(fechahoy.getDay-Producto.vencimiento = 30)
                                  .where('producto.vencimiento <=:suma',{suma: suma})
                                  .getCount()

        return produvence;  
          // const res = myMoment.add('2','days')
         // const res= moment(fechahoy).add(2,'days')
         
       
          //fechahoy.getDay
         // console.log("holaaaa",fechahoy-fechaantes);
         
          //const mo= myMoment.add('2','days')

         /*  const date1 = new Date();
          const  date2 = new Date("2021-11-30");      
          const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
          const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
          const  day = 1000*60*60*24;*/

         // const result = (date2utc - date1utc)/day;
         //const result = date1. +10;
      

        //console.log(suma)
          



  }

  //Me entrega sola una producto especifica

  async getProducto(idproducto: number): Promise<Producto> {
    if (!idproducto) {
      throw new BadRequestException('Necesita un id');
    }

    const producto: Producto = await this.repository.findOne({
      
      relations: ['imgproductos','unidadproductos','categoria','compra','proveedor'],
      where:{idproducto, estado:'ACTIVO'},
    });

    return producto;
  }

  async postCateProduUniImg(idcategoria: number): Promise<any> {

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
   
    }

  //crea una nueva producto

  async createProducto(producto: Producto): Promise<Producto> {

   producto.nombre = producto.nombre;
   producto.descripcion = producto.descripcion;
   producto.stock = producto.stock;
   producto.minimo = producto.minimo;
   //producto.maximo = producto.maximo;
   producto.vencimiento = producto.vencimiento;
   producto.precio = producto.precio;
   producto.disponible = producto.disponible;
   producto.peso = producto.peso;
   producto.fecha = producto.fecha;
   producto.categoria = producto.categoria;

    const savedProducto: Producto = await this.repository.save(producto);

    return savedProducto;
  }

  //Elimina una producto especifica

  async deleteProducto(id: number): Promise<any> {
    const producto = new Producto();
    producto.estado = 'INACTIVO';
    const deleteProducto = await this.repository.update(id, producto );
    return deleteProducto;
  }

  //actualiza una producto especifica

  async updateProducto(id: number, producto: Producto): Promise<any> {
    const updateProducto = await this.repository.update(id, producto);
    return updateProducto;
  }

   async updateProductoStock( pedidoProducto: PedidoProducto): Promise<number> {
    /* Resta la cantidad de productos segun se vaya confirmando las ventas en el admin*/
   // console.log("desde backend",pedidoProducto);
    
    const  producto = new Producto();
    const productos= '';
    let contador =0;
    let id;
     for(const indice in pedidoProducto)
         {
            
           
            id = producto.idproducto = pedidoProducto[indice].idproducto ;
            //se obtiene productos con idproducto que fueron comprados
            const resultStock =  await this.repository.find({ idproducto: id, });
            //sacamos minimo de ese producto
            const minimoprodu = resultStock[0].minimo;
            //restamos del stock disponible con la cantidad comprada
            producto.stock = resultStock[0].stock-pedidoProducto[indice].cantidad;

            const comparacion = resultStock[0].stock-pedidoProducto[indice].cantidad;

            if(comparacion <= minimoprodu)
            {
                contador = contador + 1; 
            }
            
            
            await  this.repository.update(id, producto);
         }
         return contador;






  }
}
