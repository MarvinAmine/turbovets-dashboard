// File: /apps/api/test/auth.test.ts

import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let auth: AuthService;
  let users: Partial<UsersService>;
  let jwt: Partial<JwtService>;

  beforeEach(() => {
    const password = 'Password123!';
    const hash = bcrypt.hashSync(password, 10);

    users = {
      findByEmail: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        passwordHash: hash,
        orgId: 1,
      }),
      getRoleNames: jest.fn().mockResolvedValue(['ADMIN']),
    };

    jwt = {
      signAsync: jest.fn().mockResolvedValue('fake-jwt-token'),
    };

    auth = new AuthService(users as any, jwt as any);
  });

  it('should validate and return a user', async () => {
    const user = await auth.validateUser('test@test.com', 'Password123!');
    expect(user.email).toBe('test@test.com');
  });

  it('should return a token on login', async () => {
    const res = await auth.login('test@test.com', 'Password123!');
    expect(res.accessToken).toBe('fake-jwt-token');
  });
});
