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

  @Get() // GET /task
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id') // GET /task/123
  findTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.findByID(id);
  }

  @Post() // POST /task
  createTask(@Body() createDto: CreateTaskDto): Promise<Task> {
    return this.taskService.insert(createDto);
  }

  @Put(':id') // PUT /task/123
  updateTask(
    @Param('id') id: string,
    @Body() updateTask: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, updateTask);
  }

  @Delete(':id') // DELETE /task/123
  @HttpCode(204)
  removeTask(@Param('id') id: string): Promise<void> {
    return this.taskService.remove(id);
  }
}
