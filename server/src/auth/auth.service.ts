import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.userService.register(authCredentialsDto);
  }

  async login(
    password: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.validateUserPassword(password, email);

    if (!user) {
      throw new UnauthorizedException('Email or Password is invalid');
    }

    const payload: JwtPayload = { email: user.email, id: user.id };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
