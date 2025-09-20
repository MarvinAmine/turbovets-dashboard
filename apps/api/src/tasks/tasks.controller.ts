import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
  import { Request } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RbacGuard } from '../common/guards/rbac.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AuditInterceptor } from '../audit/audit.interceptor';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RbacGuard)
export class TasksController {
  constructor(private tasks: TasksService) {}

  @Get()
  @Roles('OWNER', 'ADMIN', 'VIEWER')
  list(@Req() req: Request) {
    const u = req.user as any;
    return this.tasks.list(u.orgId, u.sub, u.roles || []);
  }

  @Post()
  @UseInterceptors(AuditInterceptor)
  @Roles('OWNER', 'ADMIN')
  create(@Req() req: Request, @Body() dto: CreateTaskDto) {
    const u = req.user as any;
    return this.tasks.create(u.orgId, u.sub, dto);
  }

  @Put(':id')
  @UseInterceptors(AuditInterceptor)
  @Roles('OWNER', 'ADMIN')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    const u = req.user as any;
    return this.tasks.update(u.orgId, id, dto);
  }

  @Delete(':id')
  @UseInterceptors(AuditInterceptor)
  @Roles('OWNER', 'ADMIN')
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const u = req.user as any;
    return this.tasks.remove(u.orgId, id);
  }
}
