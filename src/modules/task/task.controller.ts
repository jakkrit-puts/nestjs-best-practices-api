import { Controller, Get } from '@nestjs/common';

@Controller('task')
export class TaskController {
  @Get()
  findAll() {
    return 'get task';
  }
}
