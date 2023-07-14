import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { LoginService } from 'src/service/login/login.service';
import { Login } from 'src/modules/login/login.entity';
import { ResetPasswordDto } from 'src/modules/login/dto/reset-password.dto';

@Controller('login')
export class LoginController {
  constructor(private service: LoginService) {}

  @Get('/logins')
  async getLogins(): Promise<Login[]> {
    const logins = await this.service.getLogins();
    return logins;
  }

  @Get('/:id')
  async getLogin(@Param('id', ParseIntPipe) id: number): Promise<Login> {
    const login = await this.service.getLogin(id);
    return login;
  }

  @Post('/create')
  async createLogin(@Body() login: Login): Promise<Login> {
    const createdLogin = await this.service.createLogin(login);
    return createdLogin;
  }

  @Put('/put/:id')
  async updatelogin(
    @Param('id', ParseIntPipe) id: number,
    @Body() login: Login,
  ): Promise<Login> {
    const updatelogin = await this.service.updateLogin(id, login);
    return updatelogin;
  }

  @Delete('/delete/:id')
  async deletelogin(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const logindelete = await this.service.deleteLogin(id);
    if (!logindelete)
      throw new NotFoundException('No hay registro con ese id para eliminar');
    return logindelete;
  }

  //TODO: restablecer contraseña
  @Patch('/reset-password')
  async ResetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<string> {
    const resetPassword = await this.service.resetPassword(resetPasswordDto);
    return resetPassword;
  }
}
