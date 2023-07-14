import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorController } from 'src/controller/proveedor/proveedor.controller';
import { ProveedorService } from 'src/service/proveedor/proveedor.service';
import { ProveedorRepository } from './proveedor.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProveedorRepository])],
    providers: [ProveedorService],
    controllers: [ProveedorController]
})

export class ProveedorModule {}
