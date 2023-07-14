import { Repository, EntityRepository } from "typeorm";
import { Repartidor } from "./repartidor.entity";

@EntityRepository(Repartidor)
export class RepartidorRepository extends Repository<Repartidor>{

}