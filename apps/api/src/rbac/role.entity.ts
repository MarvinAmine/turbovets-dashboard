import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: 'OWNER' | 'ADMIN' | 'VIEWER';

  @OneToMany(() => UserRole, (ur) => ur.role)
  userRoles!: UserRole[];
}
