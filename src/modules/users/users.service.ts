import { PrismaService } from './../../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCreateDTO } from './users.DTO';
import { hash } from 'bcrypt';

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

    const hashedPassword = await hash(data.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const { password, ...response } = newUser;

    return response;
  }

  async listUsers() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async listUser(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        applications: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { password, ...response } = user;

    return response;
  }
}
