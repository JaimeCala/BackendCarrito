import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaRepository } from './categoria.repository';
import { CategoriaService } from 'src/service/categoria/categoria.service';
import { CategoriaController } from 'src/controller/categoria/categoria.controller';


@Module({
    imports: [TypeOrmModule.forFeature([CategoriaRepository])],
    providers: [CategoriaService],
    controllers: [CategoriaController]
})
export class CategoriaModule {}
