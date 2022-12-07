import { HttpException, HttpStatus } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class VerifyKeys implements NestMiddleware {
  use(req: Request, res: Response, next: any) {
    const { status, level, stack } = req.body;

    const expectedLevels = ['Junior', 'Pleno', 'Senior'];
    const expectedStacks = ['Front-End', 'Back-End', 'Full-Stack'];

    const expectedStatus = [
      'Analise de CV',
      'Teste Fit Cultural',
      'Teste Técnico',
      'Entrevista RH',
      'Entrevista Técnica',
      'Entrevista TL',
      'Contratado',
      'Recusado',
    ];

    const expected1 = expectedStatus.find((expected) => expected === status);
    const expected2 = expectedStacks.find((expected) => expected === stack);
    const expected3 = expectedLevels.find((expected) => expected === level);

    if (!expected1) {
      throw new HttpException(
        'Aceita somente: CV Vsualizado, Teste Fit Cultural, Teste Técnico, Entrevista RH, Entrevista Técnica, Entrevista TL, Contratado, Recusado',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!expected2) {
      throw new HttpException(
        'Aceita somente: Front-End, Back-End, Full-Stack',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!expected3) {
      throw new HttpException(
        'Aceita somente: Junior, Pleno, Senior',
        HttpStatus.BAD_REQUEST,
      );
    }

    next();
  }
}
