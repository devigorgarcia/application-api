import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateApplicationDTO, UpdateApplicationDTO } from './applications.DTO';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  async create(@Body() data: CreateApplicationDTO, @Req() request: Request) {
    const { id } = request.user;
    return this.applicationsService.create(data, id);
  }

  @Get()
  async listApps() {
    return this.applicationsService.listApplications();
  }

  @Get(':app_id')
  async listApp(@Param('app_id') app_id: string) {
    return this.applicationsService.listApplication(app_id);
  }

  @Get('/:user_id/user')
  async listUserApp(@Param('user_id') user_id: string) {
    return this.applicationsService.listUserApplications(user_id);
  }

  @Patch(':app_id')
  async updateApp(
    @Param('app_id') app_id: string,
    @Body() data: UpdateApplicationDTO,
  ) {
    return this.applicationsService.updateApplication(data, app_id);
  }

  @Delete(':app_id')
  @HttpCode(204)
  async deleteApp(@Param('app_id') app_id: string) {
    return this.applicationsService.deleteApplication(app_id);
  }
}
