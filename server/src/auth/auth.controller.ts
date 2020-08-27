import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  async login(
    @Body('password') password: string,
    @Body('email') email: string,
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(password, email);
  }
}
