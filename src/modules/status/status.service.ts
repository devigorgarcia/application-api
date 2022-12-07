import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStatusDTO } from './status.DTO';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}

  async updateStatus(data: UpdateStatusDTO, status_id: string) {
    const status = await this.prisma.status.findUnique({
      where: {
        id: status_id,
      },
    });

    if (!status) {
      throw new HttpException('Status not found', HttpStatus.NOT_FOUND);
    }

    const updatedStatus = await this.prisma.status.update({
      data,
      where: {
        id: status_id,
      },
    });

    return updatedStatus;
  }
}
