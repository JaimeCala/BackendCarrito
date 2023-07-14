import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration } from 'src/config/config.keys';
import { ConfigService } from 'src/config/config.service';
import { AuthRepository } from 'src/modules/auth/auth.repository';
import { RequestResetPasswordDto } from 'src/modules/login/dto/request-reset-password.dto';
import { Login } from 'src/modules/login/login.entity';
import { LoginRepository } from 'src/modules/login/login.repository';
import { v4 } from 'uuid';

@Injectable()
export class NodemailerService {
  constructor(
    //@InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly configService: ConfigService,
    private readonly loginRepository: LoginRepository,

    private readonly _mailerService: MailerService,
  ) {}
  //TODO: enviar email
  async sendEmailforgotPassword(
    requestResetPassword: RequestResetPasswordDto,
  ): Promise<string> {
    const { username } = requestResetPassword;

    const verificarEmail: Login = await this.verificarEmail(username);

    //const linkForgotPass = this.configService.get(Configuration.URL_FRONTEND);
    let linkForgotPass;
    if (!verificarEmail) {
      //enviar usuario no encontrado

      return 'Se encontró un problema';
    } else {
      const resetTokenPass = await this.saveResetTokenPassword(verificarEmail);
      //linkForgotPass = `http://localhost:4200/forgot/?token=${resetTokenPass}`;
      linkForgotPass = `this.configService.get(Configuration.URL_FRONTEND)?token=${resetTokenPass}`;

      //mancar email
      this._mailerService.sendMail({
        to: `${requestResetPassword.username}`,

        from: 'micromarket.homeservice@gmail.com',
        subject: 'Restablecer contraseña',
        text: 'Debes entrar en el link para poder cambiar tu contraseña',
        html: `<b> Por favor haga click en el link para restablecer su contraseña</b>
              <a href="${linkForgotPass}">${linkForgotPass}</a>`,
      });

      return 'Correo enviado';
    }
  }

  //TODO: verificar email de recuperacion
  async verificarEmail(username: string): Promise<Login> {
    //const { username} = new Login();

    try {
      const verificarEmail = await this._authRepository.findOne({
        //select: ['username'],
        where: { username },
      });

      return verificarEmail;
    } catch (error) {
      return;
    }
  }

  //TODO: insertar token reset password
  async saveResetTokenPassword(login: Login): Promise<string> {
    //const login = new Login();

    //login.resetPasswordToken = v4();
    const updated = Object.assign(login, (login.resetPasswordToken = v4()));
    const resetToken = await this.loginRepository.save(updated);

    return resetToken.resetPasswordToken;
  }
}
