import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadProducRepository } from './unidad-produc.repository';
import { UnidadProducService } from 'src/service/unidad-produc/unidad-produc.service';
import { UnidadProducController } from 'src/controller/unidad-produc/unidad-produc.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UnidadProducRepository])],
    providers: [UnidadProducService],
    controllers: [UnidadProducController]
})
export class UnidadProducModule {}
