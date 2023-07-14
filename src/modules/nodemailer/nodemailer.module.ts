import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { Configuration } from 'src/config/config.keys';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { AuthController } from 'src/controller/auth/auth.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from '../auth/auth.repository';
import { UserRepository } from '../user/user.repository';

import { AuthModule } from '../auth/auth.module';
import { NodemailerService } from 'src/service/nodemailer/nodemailer.service';
import { LoginRepository } from '../login/login.repository';

@Module({
  imports: [
    AuthModule,

    TypeOrmModule.forFeature([AuthRepository, UserRepository, LoginRepository]),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.sendgrid.net',
          auth: {
            user: configService.get(Configuration.API_SENDGRID),
            pass: configService.get(Configuration.PASS_SENDGRID),
          },
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [NodemailerService],

  exports: [NodemailerService],
})
export class NodemailerModule {}
