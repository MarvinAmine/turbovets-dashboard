import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmFactory } from './config/typeorm.factory';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrgModule } from './organizations/org.module';
import { TasksModule } from './tasks/tasks.module';
import { AuditModule } from './audit/audit.module';

import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({ useFactory: typeOrmFactory }),
    AuthModule,
    UsersModule,
    OrgModule,
    TasksModule,
    AuditModule,
  ],
  providers: [SeedService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seeder: SeedService) {}

  async onModuleInit() {
    // Seed only if DB is empty (idempotent)
    await this.seeder.seedIfEmpty();
  }
}
