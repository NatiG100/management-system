import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, isStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  fullName: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}
