import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/service/user/user.service';
import { UserController } from 'src/controller/user/user.controller';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository]), 
    AuthModule,PassportModule, // se importa authmodule, passportModule para poner restriccion en los controladores deseadors
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
