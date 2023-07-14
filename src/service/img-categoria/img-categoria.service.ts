import { Injectable } from '@nestjs/common';
import { ImgCategoriaRepository } from 'src/modules/img-categoria/img-categoria.repository';
import { ImgCategoria } from 'src/modules/img-categoria/img-categoria.entity';


@Injectable()
export class ImgCategoriaService {
  constructor(private repository: ImgCategoriaRepository) {}

  async getImgCates(): Promise<ImgCategoria[]> {

    const imgCate:ImgCategoria[] = await this.repository.find();
    return imgCate;
  

  }

  async createImgCategoria(categoria: ImgCategoria, imgnombre: string, imglink: string, ): Promise<ImgCategoria> {
    
    const imgcategoria = new ImgCategoria();

    /*const categoria = await getRepository(Categoria)
      .createQueryBuilder('categoria')
      .select('MAX(categoria.idcategoria)', 'max');
    const maximo = await categoria.getRawOne();*/
    //asignando id de la categoria
    const categoriaid = categoria;

    imgcategoria.nombreimgcategoria = imgnombre;
    imgcategoria.linkimgcategoria = imglink;
    imgcategoria.categoria = categoriaid.categoria;
    const savedImgcate = await this.repository.save(imgcategoria);
    return savedImgcate;
   
  }

  /*async deleteUser(id: number): Promise<any> {
    const deleteUser = await this.repository.delete(id);
    return deleteUser;
  }*/

  async updateImgCategoria(id: number, imgnombre: string,imglink:string): Promise<any> {

    
     const imgcategoria = new ImgCategoria();


    imgcategoria.nombreimgcategoria = imgnombre;
    imgcategoria.linkimgcategoria = imglink;
   
    const updateUser = await this.repository.update(id, imgcategoria);
    return updateUser;
  }
}
