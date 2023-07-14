import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendedorRepository } from './vendedor.repository';
import { VendedorController } from 'src/controller/vendedor/vendedor.controller';
import { VendedorService } from 'src/service/vendedor/vendedor.service';

@Module({
    imports: [TypeOrmModule.forFeature([VendedorRepository])],
    providers: [VendedorService],
    controllers: [VendedorController]
})
export class VendedorModule {}
