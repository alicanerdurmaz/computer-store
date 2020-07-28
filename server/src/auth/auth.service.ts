import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ data: string }> {
    return await this.userService.register(authCredentialsDto);
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.validateUserPassword(
      authCredentialsDto,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = { email: user.email };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
