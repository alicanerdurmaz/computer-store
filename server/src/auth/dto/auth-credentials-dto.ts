import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
    message: 'E-Mail is not valid.',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password Too Weak',
  })
  password: string;
}
