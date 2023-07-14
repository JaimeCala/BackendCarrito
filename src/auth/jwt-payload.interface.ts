import { User } from "src/modules/user/user.entity";

export interface IJwtPayload{
    idlogin:number;
    username: string;
    iat?:Date;
    role: string;
    
    idusuario?:number;
}