import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Role } from './role.entity';

@Entity({ name: 'user_roles' })
export class UserRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  roleId!: number;

  @ManyToOne(() => User, (u) => u.userRoles, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Role, (r) => r.userRoles, { onDelete: 'CASCADE' })
  role!: Role;
}
