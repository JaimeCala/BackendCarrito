import { Repository, EntityRepository } from "typeorm";
import { Admin } from "./admin.entity";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{

}