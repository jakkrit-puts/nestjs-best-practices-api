import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NOT_FOUND_DATA } from 'src/shared/message';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/cretae-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAll(limit = 2, offset = 0): Promise<Task[]> {
    return this.taskRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findByID(id: string): Promise<Task> {
    const checkTask = await this.taskRepository.findOne({ where: { id: id } });

    if (!checkTask) {
      throw new NotFoundException(NOT_FOUND_DATA);
    }

    return this.taskRepository.findOne({ where: { id: id } });
  }

  async insert(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description } = updateTaskDto;

    const checkTask = await this.findByID(id);

    if (!checkTask) {
      throw new NotFoundException(NOT_FOUND_DATA);
    }

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
    const checkTask = await this.findByID(id);

    if (!checkTask) {
      throw new NotFoundException(NOT_FOUND_DATA);
    }

    await this.taskRepository.delete(id);
  }
}
