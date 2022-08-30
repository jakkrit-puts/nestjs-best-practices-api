import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/cretae-task.dto';
import { Task } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) task: Repository<Task>) {}

  async insertTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return;
  }
}
