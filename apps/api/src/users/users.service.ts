import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRole } from '../rbac/user-role.entity';
import { Role } from '../rbac/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Role) private roles: Repository<Role>,
    @InjectRepository(UserRole) private userRoles: Repository<UserRole>,
  ) {}

  findByEmail(email: string) {
    return this.users.findOne({ where: { email } });
  }

  async getRoleNames(userId: number): Promise<string[]> {
    const rows = await this.userRoles.find({
      where: { userId },
      relations: ['role'],
    });
    return rows.map((r) => r.role.name);
  }
}
