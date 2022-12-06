import { PrismaService } from './../../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCreateDTO } from './users.DTO';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserCreateDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new HttpException('User already Exists', HttpStatus.CONFLICT);
    }

    const newUser = await this.prisma.user.create({ data });

    return newUser;
  }

  async listUsers() {
    const users = await this.prisma.user.findMany();

    return users;
  }
}
