import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
}
