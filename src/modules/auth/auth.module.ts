import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthController } from 'src/controller/auth/auth.controller';
import { AuthService } from 'src/service/auth/auth.service';
import { ConfigService } from 'src/config/config.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Configuration } from 'src/config/config.keys';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { ConfigModule } from 'src/config/config.module';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';

import { UserRepository } from '../user/user.repository';

import { NodemailerService } from 'src/service/nodemailer/nodemailer.service';
import { LoginRepository } from '../login/login.repository';

@Module({
  imports: [
    //NodemailerModule,
    TypeOrmModule.forFeature([AuthRepository, UserRepository, LoginRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            //expiresIn: '7200s', // 1hora
            expiresIn: '90d',
            //expiresIn: "10h" // it will be expired after 10 hours
            //expiresIn: "20d" // it will be expired after 20 days
            //expiresIn: 120 // it will be expired after 120ms
            //expiresIn: "120s" // it will be expired after 120s
          },
        };
      },
    }),
  ],
  controllers: [AuthController], //poner passportModulo
  providers: [
    AuthService,
    ConfigService,
    JwtStrategy,
    LocalStrategy,
    NodemailerService,
    /*AuthRepository,
    UserRepository,
    LoginRepository,*/
  ], //poner localStrategy
  exports: [
    JwtStrategy,
    PassportModule,
    AuthService,
    ConfigService,
    /*AuthRepository,
    UserRepository,
    LoginRepository,*/
  ], //se agrega authService
})
export class AuthModule {}
