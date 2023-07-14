import { Repository, EntityRepository } from "typeorm";
import { PedidoProducto } from "./pedido-produ.entity";

@EntityRepository(PedidoProducto)
export class PedidoProduRepository extends Repository<PedidoProducto>{

}