import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AuditService {
  async tail(limit = 50): Promise<string[]> {
    try {
      const data = await fs.promises.readFile('audit.log', 'utf8');
      const lines = data.trim().split('\n');
      return lines.slice(-limit);
    } catch {
      return [];
    }
  }
}
