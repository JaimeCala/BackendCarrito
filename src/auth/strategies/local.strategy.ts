import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';
import { IJwtPayload } from '../jwt-payload.interface';
import { AuthRepository } from 'src/modules/auth/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   
  constructor(
      private authService: AuthService,
      @InjectRepository(AuthRepository)
      private readonly _authRepository: AuthRepository,
      
      ) {
    super();
  }

    async validate(payload: IJwtPayload): Promise<IJwtPayload>{
        const {username} = payload;
        const userlogin = await this._authRepository.findOne({
            where: {username}
        });

        if(!userlogin){
            throw new UnauthorizedException('local strategy');
        }
        return payload;


    }
}