import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, Matches } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(30)
  @IsString()
  name: string;

  @ApiProperty()
  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
    message: 'E-Mail is not valid.',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  addresses: [
    {
      addressName: string;
      city: string;
      country: string;
      address: string;
    },
  ];

  @ApiProperty()
  phone: number;

  @ApiProperty()
  shoppingCart: string[];
}
