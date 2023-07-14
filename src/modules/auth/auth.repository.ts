import { Repository, EntityRepository } from 'typeorm';
import { Login } from '../login/login.entity';

@EntityRepository(Login)
export class AuthRepository extends Repository<Login> {}
