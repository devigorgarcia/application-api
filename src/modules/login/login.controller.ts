import { LoginService } from './login.service';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { LoginDTO } from './login.DTO';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() data: LoginDTO) {
    return this.loginService.login(data);
  }
}
