import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(private readonly tasksRepository: TaskRepository) {}

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
        return this.tasksRepository.getTasks(filterDto);
    }

   

    async getTaskById(id: string): Promise<Task>{
        const found = await this.tasksRepository.findOneBy({
              id: id,
          });
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
        
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }
}
