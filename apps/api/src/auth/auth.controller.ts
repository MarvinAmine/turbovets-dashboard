// File: /apps/api/src/auth/auth.controller.ts
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.auth.login(dto.email, dto.password);

    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // ✅ Return the plain object from AuthService
    return result;
  }

}
