import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get port(): number {
    return Number(process.env['PORT'] ?? 3000);
  }
  get jwtSecret(): string {
    const v = process.env['JWT_SECRET'];
    if (!v) throw new Error('JWT_SECRET missing');
    return v;
  }
  get databaseUrl(): string {
    const v = process.env['DATABASE_URL'];
    if (!v) throw new Error('DATABASE_URL missing');
    return v;
  }
  get nodeEnv(): string {
    return process.env['NODE_ENV'] ?? 'development';
  }
}
