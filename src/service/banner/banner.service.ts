import { Injectable } from '@nestjs/common';
import { Banner } from '../../modules/banner/banner.entity';
import { BannerRepository } from '../../modules/banner/banner.repository';

@Injectable()
export class BannerService {

    constructor(private repository: BannerRepository) {}

    async getImgBanner(): Promise<Banner[]> {

      const  banner:Banner[] = await this.repository.find({
        where: {estado: 'ACTIVO'},
      });
      return banner;

  }

    async createBanner(banner: Banner, imgnombre: string, imglink: string, ): Promise<Banner> {
    
    const imgbanner = new Banner();

    /*const categoria = await getRepository(Categoria)
      .createQueryBuilder('categoria')
      .select('MAX(categoria.idcategoria)', 'max');
    const maximo = await categoria.getRawOne();*/
    //asignando id de la categoria
    //const bannerid = banner;

    imgbanner.nombreimgbanner = imgnombre;
    imgbanner.linkimgbanner = imglink;
    //console.log('img barner desde service', imgbanner);
    
    const savedImgbanner = await this.repository.save(imgbanner);
    return savedImgbanner  
  }

  /*async deleteUser(id: number): Promise<any> {
    const deleteUser = await this.repository.delete(id);
    return deleteUser;
  }*/

  async updateBanner(id: number, imgnombre: string,imglink:string): Promise<any> {

    
    const banner = new Banner();


    banner.nombreimgbanner = imgnombre;
    banner.linkimgbanner = imglink;

    const updateUser = await this.repository.update(id, banner);
    return updateUser;
  }

  async deleteBanner(idbanner: number): Promise<any> {
    const banner = new Banner();
    banner.estado = 'INACTIVO';
    const deleteBanner = await this.repository.update(idbanner, banner );
    return deleteBanner;
  }
}
