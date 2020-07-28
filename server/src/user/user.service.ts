import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/interfaces/user.interface';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async register(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ data: string }> {
    authCredentialsDto.password = await this.hashPassword(
      authCredentialsDto.password,
      10,
    );
    const newUser = new this.userModel(authCredentialsDto);

    try {
      await newUser.save();
      return { data: 'User Successfully Created' };
    } catch (error) {
      // duplicate
      if (error.code === 11000) {
        throw new ConflictException('Email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const user = await this.userModel
      .findOne({
        email: authCredentialsDto.email,
      })
      .select('password email')
      .exec();

    if (
      user &&
      (await user.validatePassword(authCredentialsDto.password, user.password))
    ) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(
    password: string,
    saltRound: number,
  ): Promise<string> {
    return bcrypt.hash(password, saltRound);
  }
}
