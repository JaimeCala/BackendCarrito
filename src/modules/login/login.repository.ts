import { Repository, EntityRepository } from "typeorm";
import { Login } from "./login.entity";

@EntityRepository(Login)
export class LoginRepository extends Repository<Login>{

}