import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './login.DTO';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login(data: LoginDTO) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jwt = require('jsonwebtoken');

    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException('Creditals not match', HttpStatus.BAD_REQUEST);
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw new HttpException('Creditals not match', HttpStatus.BAD_REQUEST);
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '24h',
      },
    );

    return { token: token };
  }
}
