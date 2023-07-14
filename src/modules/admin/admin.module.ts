import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { AdminService } from 'src/service/admin/admin.service';
import { AdminController } from 'src/controller/admin/admin.controller';

@Module({
    imports:[TypeOrmModule.forFeature([AdminRepository])],
    providers: [AdminService],
    controllers: [AdminController]
})
export class AdminModule {}
