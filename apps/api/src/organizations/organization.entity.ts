import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Task } from '../tasks/task.entity';

@Entity({ name: 'organizations' })
export class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ type: 'int', nullable: true })
  parentId!: number | null;

  @OneToMany(() => User, (u) => u.org)
  users!: User[];

  @OneToMany(() => Task, (t) => t.org)
  tasks!: Task[];
}
