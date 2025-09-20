// File 1: /apps/api/src/tasks/task.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { User } from '../users/user.entity';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar', nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category!: string | null;

  @Column({ type: 'enum', enum: ['TODO', 'IN_PROGRESS', 'DONE'], default: 'TODO' })
  status!: TaskStatus;

  @Column()
  orgId!: number;

  @ManyToOne(() => Organization, (o) => o.tasks, { onDelete: 'CASCADE' })
  org!: Organization;

  @Column()
  ownerId!: number;

  @ManyToOne(() => User, (u) => u.ownedTasks)
  owner!: User;

  @Column({ nullable: true })
  assigneeId!: number | null;

  @ManyToOne(() => User, (u) => u.assignedTasks, { nullable: true })
  assignee!: User | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
