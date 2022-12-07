import { Module } from '@nestjs/common';
import { StacksService } from './stacks.service';
import { StacksController } from './stacks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StacksController],
  providers: [StacksService],
  imports: [PrismaModule],
})
export class StacksModule {}
