import { BadRequestException, Injectable } from '@nestjs/common';
import { Reclamo } from '../../modules/reclamos/reclamos.entity';
import { ReclamoRepository } from '../../modules/reclamos/reclamos.repository';

@Injectable()
export class ReclamoService {
    constructor(private repository: ReclamoRepository) {}

  /*async getUserIcono(email: string): Promise<any>{

   const user = await this.repository.findOne({where:{email}}); 

    
    return user;

  }*/

  async getReclamos(): Promise<any> {
    const reclamo: Reclamo[] = await this.repository.find({
      //select:["nombre","paterno"],
      relations: ['user'],
      where: {estado:'ACTIVO'}
    });
    return reclamo;


  }
  async getReclamosEstado(): Promise<number> {
    const reclamo: number = await this.repository.count({
      //select:["nombre","paterno"],
      //relations: ['user'],
      where: {estado:'ACTIVO'}
    });
    return reclamo;


  }

  async getReclamoId(id: number): Promise<Reclamo[]> {
    if (!id) {
      throw new BadRequestException('Necesita un id');
    }

    const reclamo: Reclamo = await this.repository.findOne(id);

    return [reclamo];
  }
 

  async createReclamo(reclamo: Reclamo): Promise<Reclamo> {
    
      reclamo.user = reclamo.user;
      const saveReclamo: Reclamo = await this.repository.save(reclamo);

      return saveReclamo;
    
  }
  


  async deleteReclamo(idreclamo: number): Promise<any> {
    /*const deleteReclamo = await this.repository.findOne(id);
    deleteReclamo.estado = 'INACTIVO'
    this.repository.save(deleteReclamo);
    return console.log("Reclamo Inactivo");*/
    const reclamo = new Reclamo();
    reclamo.estado = 'INACTIVO';
    const deleteReclamo = await this.repository.update(idreclamo, reclamo);
    return deleteReclamo;
  }

  /*async updateUser(id: number, user: User): Promise<any> {
    const updateUser = await this.repository.update(id, user);
    return updateUser;
  }*/
}
