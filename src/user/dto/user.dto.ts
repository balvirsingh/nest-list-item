import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { Unique } from 'typeorm';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
