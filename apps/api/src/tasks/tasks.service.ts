import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasks: Repository<Task>) {}

  list(orgId: number, userId: number, roles: string[]) {
    const isAdmin = roles.includes('OWNER') || roles.includes('ADMIN');
    if (isAdmin) {
      return this.tasks.find({ where: { orgId }, order: { createdAt: 'DESC' } });
    }
    return this.tasks.find({
      where: { orgId, assigneeId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async create(orgId: number, ownerId: number, dto: CreateTaskDto) {
    const task = this.tasks.create({
      ...dto,
      orgId,
      ownerId,
      status: dto.status ?? 'TODO',
      assigneeId: dto.assigneeId ?? null,
    });
    return this.tasks.save(task);
  }

  async update(orgId: number, id: number, dto: UpdateTaskDto) {
    const task = await this.tasks.findOne({ where: { id, orgId } });
    if (!task) throw new NotFoundException('Task not found');
    Object.assign(task, dto);
    return this.tasks.save(task);
  }

  async remove(orgId: number, id: number) {
    const task = await this.tasks.findOne({ where: { id, orgId } });
    if (!task) throw new NotFoundException('Task not found');
    await this.tasks.remove(task);
    return { ok: true };
  }
}
