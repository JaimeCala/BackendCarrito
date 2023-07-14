import { PassportStrategy} from '@nestjs/passport';
//import { Strategy } from 'passport-local';
import { ConfigService } from 'src/config/config.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Configuration } from 'src/config/config.keys';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../jwt-payload.interface';
import { AuthRepository } from 'src/modules/auth/auth.repository';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly _configService: ConfigService,
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository, 
        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get(Configuration.JWT_SECRET),
            
        });
    }


    //validacion de si el username esta registrado y construcion de payload
    
    async validate(payload: IJwtPayload): Promise<IJwtPayload>{

        const {username} = payload;

        const userlogin = await this._authRepository.findOne({
            where: {username}
        });

        if(!userlogin){
            throw new UnauthorizedException("No estas permitido");
        }
        return payload;


    }





   

}