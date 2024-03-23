import { IsEmail, IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  password: string;
  @IsEmail()
  email: string;
}
