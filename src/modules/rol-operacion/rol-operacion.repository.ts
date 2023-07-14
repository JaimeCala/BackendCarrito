import { Repository, EntityRepository } from "typeorm";
import { RolOperacion } from "./rol-operacion.entity";

@EntityRepository(RolOperacion)
export class RolOperacionRepository extends Repository<RolOperacion>{

}