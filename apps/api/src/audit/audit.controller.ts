import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RbacGuard } from '../common/guards/rbac.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('audit-log')
@UseGuards(JwtAuthGuard, RbacGuard)
export class AuditController {
  constructor(private audit: AuditService) {}

  @Get()
  @Roles('OWNER', 'ADMIN')
  list(@Query('last') last?: string) {
    const limit = Math.min(Number(last ?? 50), 500);
    return this.audit.tail(limit);
  }
}
