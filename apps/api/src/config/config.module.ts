// apps/api/src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';
import { ConfigService } from './config.service';
import * as path from 'path';

@Module({
  imports: [
    NestConfig.forRoot({
      isGlobal: true,
      envFilePath: [path.resolve(__dirname, '../../..', '.env.${process.env.NODE_ENV}')], 
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
