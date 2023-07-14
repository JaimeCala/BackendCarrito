import { Repository, EntityRepository } from "typeorm";
import { ImgProducto } from "./img-producto.entity";

@EntityRepository(ImgProducto)
export class ImgProductoRepository extends Repository<ImgProducto>{

}