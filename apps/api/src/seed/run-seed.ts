import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeedService);

  await seeder.seedIfEmpty();
  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Seeding failed', err);
  process.exit(1);
});
