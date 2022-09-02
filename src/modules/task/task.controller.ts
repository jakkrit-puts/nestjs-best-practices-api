import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateTaskDto } from './dto/cretae-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.findByID(id);
  }

  @Post()
  createTask(@Body() createDto: CreateTaskDto): Promise<Task> {
    return this.taskService.insert(createDto);
  }

  @Put()
  updateTask(@Body() updateTask: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(updateTask);
  }

  @Delete(':id')
  @HttpCode(204)
  removeTask(@Param('id') id: string): Promise<void> {
    return this.taskService.remove(id);
  }
}
