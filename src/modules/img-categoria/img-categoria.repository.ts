import { Repository, EntityRepository } from "typeorm";
import { ImgCategoria } from "./img-categoria.entity";

@EntityRepository(ImgCategoria)
export class ImgCategoriaRepository extends Repository<ImgCategoria>{

}