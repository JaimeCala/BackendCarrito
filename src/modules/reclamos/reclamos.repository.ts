import { EntityRepository, Repository } from "typeorm";
import { Reclamo } from "./reclamos.entity";

@EntityRepository(Reclamo)
export class ReclamoRepository extends Repository<Reclamo>{

}