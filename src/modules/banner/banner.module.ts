import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerController } from '../../controller/banner/banner.controller';
import { BannerService } from '../../service/banner/banner.service';
import { BannerRepository } from './banner.repository';

@Module({
    imports: [TypeOrmModule.forFeature([BannerRepository]),
    MulterModule.register({
        dest: './public/uploads/banner',
    }),

    ],
    providers: [BannerService],
    controllers: [BannerController],
})
export class BannerModule {}
