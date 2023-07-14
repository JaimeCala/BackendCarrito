import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaRepository } from './venta.repository';
import { VentaController } from 'src/controller/venta/venta.controller';
import { VentaService } from 'src/service/venta/venta.service';

@Module({
    imports: [TypeOrmModule.forFeature([VentaRepository])],
    providers: [VentaService],
    controllers: [VentaController]
})
export class VentaModule {}
