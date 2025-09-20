import { DataSourceOptions } from 'typeorm';
import { ConfigService } from './config.service';

// Entities
import { User } from '../users/user.entity';
import { Organization } from '../organizations/organization.entity';
import { Role } from '../rbac/role.entity';
import { UserRole } from '../rbac/user-role.entity';
import { Task } from '../tasks/task.entity';

export function typeOrmFactory(): DataSourceOptions {
  const cfg = new ConfigService();
  const isProd = cfg.nodeEnv === 'production';

  return {
    type: 'postgres',
    url: cfg.databaseUrl,
    entities: [User, Organization, Role, UserRole, Task],
    // For the challenge / Docker dev: auto-create tables
    synchronize: true,
    logging: false,
    ssl: false, // set true with proper options if your DB requires SSL
  } as DataSourceOptions;
}
