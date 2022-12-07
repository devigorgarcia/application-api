import { HttpException, HttpStatus } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: any) {
    const jwt = require('jsonwebtoken');

    let token = req.headers.authorization;

    if (!token) {
      throw new HttpException('Missing Token', HttpStatus.UNAUTHORIZED);
    }

    token = token.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (error: any, decoded: any) => {
      if (error) {
        throw new HttpException('invalid Token', HttpStatus.BAD_REQUEST);
      }

      req.user = {
        email: decoded.email,
        id: decoded.id,
      };
    });
    next();
  }
}
