import { Repository, EntityRepository } from "typeorm";
import { Venta } from "./venta.entity";

@EntityRepository(Venta)
export class VentaRepository extends Repository<Venta>{

}