import { Controller, Post, Body, UnauthorizedException, UseGuards, Res } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { User } from "./entities/user.entity";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto, @Res({ passthrough: true }) res: Response) {

    const user = await this.authService.validateUser(authDto.login, authDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log("utilisateur trouvé", user)
     const token = this.authService.generateToken(user.id, user.login);

    res.cookie('access_token', token, {
      httpOnly: true,                          // ⚠️ inaccessible via JS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',                         // ou 'none' si CORS avec HTTPS
      path: '/',
      maxAge: 3600_000,                        // 1h par ex.
    });

  return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createUser(@Body() user: User) {
    return this.authService.createUser(user);
  }
}