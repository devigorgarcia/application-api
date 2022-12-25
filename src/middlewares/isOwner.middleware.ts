import { HttpException, HttpStatus } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class isOwner implements NestMiddleware {
  use(req: Request, res: Response, next: any) {
    const { userId } = req.params;
    const { id } = req.user;

    if (userId !== id) {
      throw new HttpException(
        'Your not owner of this',
        HttpStatus.UNAUTHORIZED,
      );
    }
    next();
  }
}
