import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoRepository } from './producto.repository';
import { ProductoService } from 'src/service/producto/producto.service';
import { ProductoController } from 'src/controller/producto/producto.controller';


@Module({
    imports: [TypeOrmModule.forFeature([ProductoRepository])],
    providers: [ProductoService],
    controllers: [ProductoController]
})
export class ProductoModule {}
