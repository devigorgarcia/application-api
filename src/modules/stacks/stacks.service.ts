import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StacksService {
  constructor(private prisma: PrismaService) {}

  async listStacks() {
    const listStacks = await this.prisma.stacks.findMany();

    return listStacks;
  }
}
