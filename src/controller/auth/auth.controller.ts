import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';
import { Login } from 'src/modules/login/login.entity';
import { NodemailerService } from 'src/service/nodemailer/nodemailer.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _nodemailerService: NodemailerService,
  ) {}

  @Post('/inicioSesion')
  async iniSesion(@Body() login: Login): Promise<any> {
    return this._authService.validateUser(login);
  }

  //todo: enviar email
  @Patch('/enviarEmail')
  EnviarEmail(@Body() username: Login): Promise<string> {
    return this._nodemailerService.sendEmailforgotPassword(username);
  }
}
