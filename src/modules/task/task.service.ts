import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/cretae-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findByID(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id: id } });
  }

  async insert(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description } = updateTaskDto;

    const task = await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });

    task.title = title;
    task.description = description;

    return this.taskRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
