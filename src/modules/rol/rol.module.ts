import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolRepository } from './rol.repository';
import { RolService } from 'src/service/rol/rol.service';
import { RolController } from 'src/controller/rol/rol.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RolRepository])],
    providers: [RolService],
    controllers: [RolController]
})
export class RolModule {}
