import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly filePath = path.resolve(process.cwd(), 'audit.log');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const actor = req.user?.email ?? 'anonymous';
    const log = {
      time: new Date().toISOString(),
      actor,
      method: req.method,
      url: req.originalUrl ?? req.url,
      orgId: req.user?.orgId ?? null,
    };
    return next.handle().pipe(
      tap(() => {
        fs.appendFile(
          this.filePath,
          JSON.stringify(log) + '\n',
          () => void 0,
        );
      }),
    );
  }
}
