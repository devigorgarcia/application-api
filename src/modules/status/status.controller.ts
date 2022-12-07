import { Controller, Patch, Param, Body, Get } from '@nestjs/common';
import { UpdateStatusDTO } from './status.DTO';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  async listAllStatus() {
    return this.statusService.listAllStatus();
  }

  @Patch(':status_id')
  async updateStatus(
    @Param('status_id') status_id: string,
    @Body() data: UpdateStatusDTO,
  ) {
    return this.statusService.updateStatus(data, status_id);
  }
}
