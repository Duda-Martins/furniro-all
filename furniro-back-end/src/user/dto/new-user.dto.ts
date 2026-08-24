import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class NewUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
