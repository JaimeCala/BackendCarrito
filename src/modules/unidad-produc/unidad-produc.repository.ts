import { Repository, EntityRepository } from "typeorm";
import { UnidadProducto } from "./unidad-produc.entity";

@EntityRepository(UnidadProducto)
export class UnidadProducRepository extends Repository<UnidadProducto>{

}