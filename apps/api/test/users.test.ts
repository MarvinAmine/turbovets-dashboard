// File: /apps/api/test/users.test.ts

import { UsersService } from '../src/users/users.service';
import { User } from '../src/users/user.entity';
import { Role } from '../src/rbac/role.entity';
import { UserRole } from '../src/rbac/user-role.entity';

describe('UsersService', () => {
  let users: UsersService;
  let userRepo: any;
  let roleRepo: any;
  let userRoleRepo: any;

  beforeEach(() => {
    userRepo = {
      findOne: jest.fn(),
    };

    roleRepo = {};

    userRoleRepo = {
      find: jest.fn(),
    };

    users = new UsersService(userRepo, roleRepo, userRoleRepo);
  });

  it('should find user by email', async () => {
    const fakeUser: User = {
      id: 1,
      email: 'test@test.com',
      passwordHash: 'hashed',
      displayName: 'Tester',
      orgId: 1,
      org: {} as any,
      userRoles: [],
      ownedTasks: [],
      assignedTasks: [],
    };

    userRepo.findOne.mockResolvedValue(fakeUser);

    const user = await users.findByEmail('test@test.com');
    expect(user?.email).toBe('test@test.com');
  });

  it('should return role names for a user', async () => {
    userRoleRepo.find.mockResolvedValue([
      { role: { name: 'ADMIN' } as Role } as UserRole,
    ]);

    const roles = await users.getRoleNames(1);
    expect(roles).toEqual(['ADMIN']);
  });
});
