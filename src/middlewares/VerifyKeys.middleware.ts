import { HttpException, HttpStatus } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class VerifyUpdateKeys implements NestMiddleware {
  use(req: Request, res: Response, next: any) {
    const body = req.body;

    const keys = Object.keys(body);

    if (keys.length > 3) {
      throw new HttpException(
        'Can only update obs and link',
        HttpStatus.BAD_REQUEST,
      );
    }

    const verify = keys.find(
      (key) => key == 'obs' || key == 'link' || key == 'status',
    );

    if (!verify) {
      throw new HttpException(
        'Can only update obs and link',
        HttpStatus.BAD_REQUEST,
      );
    }

    next();
  }
}
