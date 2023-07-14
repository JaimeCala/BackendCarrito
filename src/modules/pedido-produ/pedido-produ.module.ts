import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoProduService } from 'src/service/pedido-produ/pedido-produ.service';
import { PedidoProduController } from 'src/controller/pedido-produ/pedido-produ.controller';
import { PedidoProduRepository } from './pedido-produ.repository';

@Module({
    imports: [TypeOrmModule.forFeature([PedidoProduRepository])],
    providers: [PedidoProduService],
    controllers: [PedidoProduController]
})
export class PedidoProduModule {}
