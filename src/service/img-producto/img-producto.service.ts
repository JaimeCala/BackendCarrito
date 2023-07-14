import { ImgProductoRepository } from "src/modules/img-producto/img-producto.repository";
import { Injectable } from "@nestjs/common";
import { ImgProducto } from "src/modules/img-producto/img-producto.entity";
import { getRepository } from "typeorm";
import { Producto } from "src/modules/producto/producto.entity";

@Injectable()
export class ImgProductoService {
  constructor(private repository: ImgProductoRepository) {}

   async getImgCates(): Promise<ImgProducto[]> {
   
    const imgCate:ImgProducto[] = await this.repository.find();
    return imgCate;
   

  }

  async createImgProducto( producto: ImgProducto,imgnombre: string, imglink: string, ): Promise<ImgProducto> {
    
    const imgproducto = new ImgProducto();

    
   /* const producto = await getRepository(Producto)
      .createQueryBuilder('producto')
      .select('MAX(producto.idproducto)', 'max');
    const maximo = await producto.getRawOne();*/
    //asignando id de la producto
    const productoid = producto;

    imgproducto.nombreimgprodu = imgnombre;
    imgproducto.linkimgprodu = imglink;
    imgproducto.producto = productoid.producto;
    const savedImgcate = await this.repository.save(imgproducto);
    return savedImgcate;
   
  }

   async updateImgProducto(id: number, imgnombre: string,imglink:string): Promise<any> {

    
     const imgProducto = new ImgProducto();


    imgProducto.nombreimgprodu = imgnombre;
    imgProducto.linkimgprodu = imglink;
   
    const updateImgproducto = await this.repository.update(id, imgProducto);
    return updateImgproducto;
  }
  /*async deleteUser(id: number): Promise<any> {
    const deleteUser = await this.repository.delete(id);
    return deleteUser;
  }*/
}
