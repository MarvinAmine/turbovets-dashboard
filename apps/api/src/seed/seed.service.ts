import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from '../rbac/role.entity';
import { User } from '../users/user.entity';
import { UserRole } from '../rbac/user-role.entity';
import { Organization } from '../organizations/organization.entity';
import { Task } from '../tasks/task.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Role) private roles: Repository<Role>,
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(UserRole) private userRoles: Repository<UserRole>,
    @InjectRepository(Organization) private orgs: Repository<Organization>,
    @InjectRepository(Task) private tasks: Repository<Task>,
  ) {}

  async seedIfEmpty() {
    const userCount = await this.users.count();
    if (userCount > 0) return;

    // Roles
    const [owner, admin, viewer] = await this.roles.save(
      this.roles.create([{ name: 'OWNER' }, { name: 'ADMIN' }, { name: 'VIEWER' }]),
    );

    // Org
    const org = await this.orgs.save(this.orgs.create({ name: 'Acme Corp', parentId: null }));

    // Users
    const mkUser = async (email: string, display: string, role: Role) => {
      const u = await this.users.save(
        this.users.create({
          email,
          displayName: display,
          passwordHash: await bcrypt.hash('Password123!', 10),
          orgId: org.id,
        }),
      );
      await this.userRoles.save(this.userRoles.create({ userId: u.id, roleId: role.id }));
      return u;
    };

    const uOwner = await mkUser('owner@acme.test', 'Olivia Owner', owner);
    const uAdmin = await mkUser('admin@acme.test', 'Alex Admin', admin);
    const uViewer = await mkUser('viewer@acme.test', 'Vicky Viewer', viewer);

    // Sample task
    await this.tasks.save(
      this.tasks.create({
        title: 'Set up CI/CD',
        description: 'Push on main triggers deploy',
        category: 'Engineering',
        status: 'IN_PROGRESS',
        orgId: org.id,
        ownerId: uOwner.id,
        assigneeId: uAdmin.id,
      }),
    );
  }
}
