import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImgProductoRepository } from './img-producto.repository';
import { ImgProductoService } from 'src/service/img-producto/img-producto.service';
import { ImgProductoController } from 'src/controller/img-producto/img-producto.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ImgProductoRepository])],
    providers: [ImgProductoService],
    controllers: [ImgProductoController]
})
export class ImgProductoModule {}
