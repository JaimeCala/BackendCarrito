import { BadRequestException, Injectable } from '@nestjs/common';
import { VendedorRepository } from 'src/modules/vendedor/vendedor.repository';
import { getManager } from 'typeorm';
import { Vendedor } from '../../modules/vendedor/vendedor.entity';

@Injectable()
export class VendedorService {
     constructor(private repository:VendedorRepository){}

     //Me entrega todos las Vendedors
  async getVendedor(): Promise<any> {
    const Vendedor: Vendedor[] = await this.repository.find({
      //select:["nombre","paterno"],
      //relations: ['imgVendedors','unidadVendedors','categoria','compra'],
    });
    return Vendedor;
  }

  //Me entrega sola una Vendedor especifica

  async getVendedorId(idvendedor: number): Promise<Vendedor> {
    if (!idvendedor) {
      throw new BadRequestException('Necesita un id');
    }

    const Vendedor: Vendedor = await this.repository.findOne({
      
      //relations: ['imgVendedors','unidadVendedors','categoria','compra','proveedor'],
      where:{idvendedor},
    });

    return Vendedor;
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

  //crea una nueva Vendedor

  async createVendedor(Vendedor: Vendedor): Promise<Vendedor> {

    const{user} = Vendedor;
        
        const existsUser = await this.repository.findOne({where: {user}});

        if(!existsUser)
        {
            //insertando a Vendedor campos
            Vendedor.user = Vendedor.user;
            await this.repository.save(Vendedor);
            const existsUser = await this.repository.findOne({where: {user}});
            return existsUser;
        }
        
        return existsUser;
  }

  //Elimina una Vendedor especifica

  async deleteVendedor(id: number): Promise<any> {
    const deleteVendedor = await this.repository.delete(id);
    return deleteVendedor;
  }

  //actualiza una Vendedor especifica

  async updateVendedor(id: number, Vendedor: Vendedor): Promise<any> {
    const updateVendedor = await this.repository.update(id, Vendedor);
    return updateVendedor;
  }
   /* async updateVendedorEnviado(id: number): Promise<any>{

        const  vendedor = new Vendedor();
        const estadoAbierto = 'ENVIADO'
        //const resultEstado = await this.repository.findOne(id,{where:{estado:estadoAbierto}});

        //if(resultEstado){
           // return;
        //}else{
            vendedor. = estadoAbierto;
  
            const updateVendedor = await this.repository.update(id,vendedor);
            return  updateVendedor;
        //}
        
        

    }*/

}
