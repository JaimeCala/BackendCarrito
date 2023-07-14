import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraController } from 'src/controller/compra/compra.controller';
import { CompraService } from 'src/service/compra/compra.service';
import { CompraRepository } from './compra.repository';

@Module({
        imports: [TypeOrmModule.forFeature([CompraRepository])],
        providers: [CompraService],
        controllers: [CompraController]
})
export class CompraModule {}
