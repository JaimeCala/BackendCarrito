import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from './cliente.repository';
import { ClienteService } from 'src/service/cliente/cliente.service';
import { ClienteController } from 'src/controller/cliente/cliente.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ClienteRepository])],
    providers: [ClienteService],
    controllers: [ClienteController]
})
export class ClienteModule {}
