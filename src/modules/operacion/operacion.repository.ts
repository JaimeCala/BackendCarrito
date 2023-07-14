import { Repository, EntityRepository } from "typeorm";
import { Operacion } from "./operacion.entity";


@EntityRepository(Operacion)
export class OperacionRepository extends Repository<Operacion>{
    
}