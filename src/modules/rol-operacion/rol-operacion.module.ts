import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolOperacionRepository } from './rol-operacion.repository';
import { RolOperacionService } from 'src/service/rol-operacion/rol-operacion.service';
import { RolOperacionController } from 'src/controller/rol-operacion/rol-operacion.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RolOperacionRepository])],
    providers: [RolOperacionService],
    controllers: [RolOperacionController]
})
export class RolOperacionModule {}
