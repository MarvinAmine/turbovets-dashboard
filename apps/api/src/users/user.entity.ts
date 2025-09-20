import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { UserRole } from '../rbac/user-role.entity';
import { Task } from '../tasks/task.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  displayName!: string;

  @Column()
  orgId!: number;

  @ManyToOne(() => Organization, (o) => o.users, { onDelete: 'CASCADE' })
  org!: Organization;

  @OneToMany(() => UserRole, (ur) => ur.user)
  userRoles!: UserRole[];

  @OneToMany(() => Task, (t) => t.owner)
  ownedTasks!: Task[];

  @OneToMany(() => Task, (t) => t.assignee)
  assignedTasks!: Task[];
}
