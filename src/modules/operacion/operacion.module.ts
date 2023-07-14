import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacionRepository } from './operacion.repository';
import { OperacionService } from 'src/service/operacion/operacion.service';
import { OperacionController } from 'src/controller/operacion/operacion.controller';

@Module({
    imports: [TypeOrmModule.forFeature([OperacionRepository])],
    providers: [OperacionService],
    controllers: [OperacionController]
})
export class OperacionModule {}
