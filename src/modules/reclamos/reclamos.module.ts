import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReclamoController } from '../../controller/reclamo/reclamo.controller';
import { ReclamoService } from '../../service/reclamo/reclamo.service';
import { AuthModule } from '../auth/auth.module';
import { ReclamoRepository } from './reclamos.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ReclamoRepository]), 
    AuthModule,PassportModule, // se importa authmodule, passportModule para poner restriccion en los controladores deseadors
    ],
    providers: [ReclamoService],
    controllers: [ReclamoController]  
})
export class ReclamosModule {}
