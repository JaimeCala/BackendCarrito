import { Repository, EntityRepository } from "typeorm";
import { Compra } from "./compra.entity";



@EntityRepository(Compra)
export class CompraRepository extends Repository<Compra>{

}