import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuloRepository } from './modulo.repository';
import { ModuloService } from 'src/service/modulo/modulo.service';
import { ModuloController } from 'src/controller/modulo/modulo.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ModuloRepository])],
    providers: [ModuloService],
    controllers: [ModuloController]
})
export class ModuloModule {}
