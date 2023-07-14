import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImgCategoriaRepository } from './img-categoria.repository';
import { ImgCategoriaService } from 'src/service/img-categoria/img-categoria.service';
import { ImgCategoriaController } from 'src/controller/img-categoria/img-categoria.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([ImgCategoriaRepository]),
    MulterModule.register({
dest: './public/uploads',
    }),
],
  providers: [ImgCategoriaService],
  controllers: [ImgCategoriaController],
})
export class ImgCategoriaModule {}
