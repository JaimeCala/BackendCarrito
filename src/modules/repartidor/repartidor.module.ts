import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepartidorRepository } from './repartidor.repository';
import { RepartidorService } from 'src/service/repartidor/repartidor.service';
import { RepartidorController } from 'src/controller/repartidor/repartidor.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RepartidorRepository])],
    providers: [RepartidorService],
    controllers: [RepartidorController]
})
export class RepartidorModule {}
