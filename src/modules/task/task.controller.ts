import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/cretae-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';

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
  removeTask(@Param('id') id: string): Promise<void> {
    return this.taskService.remove(id);
  }
}
