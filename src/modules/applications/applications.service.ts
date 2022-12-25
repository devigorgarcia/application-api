import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicationDTO, UpdateApplicationDTO } from './applications.DTO';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateApplicationDTO, user_id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newApplication = await this.prisma.application.create({
      data: {
        title: data.title,
        org: data.org,
        link: data.link,
        user: {
          connect: {
            id: user_id,
          },
        },
        obs: data.obs,
        status: {
          create: {
            status: data.status,
          },
        },
        level: {
          create: {
            level: data.level,
          },
        },
        stack: {
          create: {
            stack: data.stack,
          },
        },
      },
    });

    return newApplication;
  }

  async listApplications() {
    const applications = await this.prisma.application.findMany({
      include: {
        level: true,
        stack: true,
        status: true,
      },
    });

    const newList = [];

    applications.forEach((application) => {
      const { userId, statusId, levelId, stackId, ...response } = application;

      newList.push(response);
    });

    return newList;
  }

  async listApplication(application_id: string) {
    const application = await this.prisma.application.findFirst({
      where: {
        id: application_id,
      },
      include: {
        level: true,
        stack: true,
        status: true,
      },
    });

    if (!application) {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }

    const { userId, statusId, levelId, stackId, ...response } = application;

    return response;
  }

  async updateApplication(data: UpdateApplicationDTO, app_id: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: app_id,
      },
    });

    if (!application) {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }

    const updatedApplication = await this.prisma.application.update({
      data,
      where: {
        id: app_id,
      },
    });

    return updatedApplication;
  }

  async deleteApplication(app_id: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: app_id,
      },
    });

    if (!application) {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.application.delete({
      where: {
        id: app_id,
      },
    });
  }

  async listUserApplications(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const userApplication = await this.prisma.application.findMany({
      where: {
        userId: userId,
      },
    });

    return userApplication;
  }
}
