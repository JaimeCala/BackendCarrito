import { Repository, EntityRepository } from "typeorm";
import { Producto} from './producto.entity';

@EntityRepository(Producto)
export class ProductoRepository extends Repository<Producto>{

}