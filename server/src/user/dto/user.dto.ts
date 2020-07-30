import { Types } from 'mongoose';
import { IsNotEmpty, IsString, MaxLength, Matches } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @MaxLength(30)
  @IsString()
  name: string;

  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
    message: 'E-Mail is not valid.',
  })
  @IsNotEmpty()
  email: string;

  addresses: [
    {
      addressName: string;
      city: string;
      country: string;
      address: string;
    },
  ];

  phone: number;

  shoppingCart: string[];
}
