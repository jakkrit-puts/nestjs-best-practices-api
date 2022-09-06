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
import {
  CREATE_DATA_SUCCESS,
  GET_DATA_SUCCESS,
  UPDATE_DATA_SUCCESS,
} from 'src/shared/message';
import { CreateTaskDto } from './dto/cretae-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get() // GET /task
  async findAll() {
    return {
      data: await this.taskService.findAll(),
      message: GET_DATA_SUCCESS,
    };
  }

  @Get(':id') // GET /task/123
  async findTask(@Param('id') id: string) {
    return {
      data: await this.taskService.findByID(id),
      message: GET_DATA_SUCCESS,
    };
  }

  @Post() // POST /task
  async createTask(@Body() createDto: CreateTaskDto) {
    return {
      data: await this.taskService.insert(createDto),
      message: CREATE_DATA_SUCCESS,
    };
  }

  @Put(':id') // PUT /task/123
  async updateTask(@Param('id') id: string, @Body() updateTask: UpdateTaskDto) {
    return {
      data: await this.taskService.update(id, updateTask),
      message: UPDATE_DATA_SUCCESS,
    };
  }

  @Delete(':id') // DELETE /task/123
  @HttpCode(204)
  async removeTask(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
