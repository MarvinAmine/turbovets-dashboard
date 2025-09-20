import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Role } from '../rbac/role.entity';
import { UserRole } from '../rbac/user-role.entity';
import { Organization } from '../organizations/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole, Organization])],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
