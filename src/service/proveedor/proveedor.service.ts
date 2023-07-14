import { BadRequestException, Injectable } from '@nestjs/common';
import { Proveedor } from 'src/modules/proveedor/proveedor.entity';
import { ProveedorRepository } from 'src/modules/proveedor/proveedor.repository';

@Injectable()
export class ProveedorService {
constructor(private repository:ProveedorRepository){}

     //Me entrega todos las proveedors
  async getProveedors(): Promise<any> {
    const proveedor: Proveedor[] = await this.repository.find({
      //select:["nombre","paterno"],
      //relations: ['compra'],
      where: {estado: 'ACTIVO'},
    });
    return proveedor;
  }

  //Me entrega sola una proveedor especifica

  async getProveedor(idproveedor: number): Promise<Proveedor> {
    if (!idproveedor) {
      throw new BadRequestException('Necesita un id');
    }

    const proveedor: Proveedor = await this.repository.findOne({
      
      //relations: ['imgproveedors','unidadproveedors','categoria'],
      where:{idproveedor, estado:'ACTIVO'},
    });

    return proveedor;
  }

  /*async postProveedores(idcategoria: number): Promise<any> {

    if (!idcategoria) {
      throw new BadRequestException('Necesita un id categoria');
    }
    const cate= await getManager()
                            .createQueryBuilder(Proveedor, "proveedor")
                            .addSelect('categoria.nombre', 'nombrecate')
                            .addSelect('proveedor.nombre','produnombre')
                            .addSelect('imgproveedor.nombreimgprodu','imgprodu')
                            .innerJoin(Categoria,"categoria","categoria.idcategoria = proveedor.idcategoria")
                            .innerJoin(ImgProveedor,"imgproveedor","proveedor.idproveedor=imgproveedor.idproveedor")
                            .where('categoria.idcategoria= :idcategoria',{idcategoria:idcategoria})
                            .getRawMany()

      return cate
   
    }*/

  //crea una nueva proveedor

  async createProveedor(proveedor: Proveedor): Promise<Proveedor> {

   proveedor.nombre = proveedor.nombre;
   proveedor.ci_nit = proveedor.ci_nit;
   proveedor.telefono = proveedor.telefono;
   //proveedor.estado = proveedor.estado;
   proveedor.email = proveedor.email;
   proveedor.direccion = proveedor.direccion;
   proveedor.fecha = proveedor.fecha;
   proveedor.hora = proveedor.hora;
   

    const savedProveedor: Proveedor = await this.repository.save(proveedor);

    return savedProveedor;
  }

  //Elimina una proveedor especifica

  async deleteProveedor(idproveedor: number): Promise<any> {
    /*const deleteProveedor = await this.repository.delete(id);
    return deleteProveedor;*/
    const proveedor = new Proveedor();
    proveedor.estado = 'INACTIVO';
    const deleteProveedor = await this.repository.update(idproveedor, proveedor);
    return deleteProveedor;
  }

  //actualiza una proveedor especifica

  async updateProveedor(id: number, proveedor: Proveedor): Promise<any> {
    const updateProveedor = await this.repository.update(id, proveedor);
    return updateProveedor;
  }
}
