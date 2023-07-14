import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoRepository } from './pedido.repository';
import { PedidoService } from 'src/service/pedido/pedido.service';
import { PedidoController } from 'src/controller/pedido/pedido.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PedidoRepository])],
    providers: [PedidoService],
    controllers: [PedidoController]
})
export class PedidoModule {}
