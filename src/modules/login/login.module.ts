import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginRepository } from './login.repository';
import { LoginService } from 'src/service/login/login.service';
import { LoginController } from 'src/controller/login/login.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([LoginRepository])],
    providers: [LoginService],
    controllers: [LoginController],
    exports:[LoginService]
})
export class LoginModule {}
