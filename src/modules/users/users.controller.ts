import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserCreateDTO } from './users.DTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() data: UserCreateDTO) {
    return this.usersService.create(data);
  }

  @Get()
  async listUsers() {
    return this.usersService.listUsers();
  }

  @Get(':userId')
  async listUser(@Param('userId') userId: string) {
    return this.usersService.listUser(userId);
  }
}
