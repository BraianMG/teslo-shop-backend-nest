import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'User email',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'P4assw0rd',
    description: 'User password',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    example: 'User admin',
    description: 'User fullname',
    default: null
  })
  @IsString()
  @MinLength(3)
  fullName: string;
}
