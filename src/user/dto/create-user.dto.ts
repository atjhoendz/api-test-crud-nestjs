import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUser, UserGender } from '../user.interface';

export class CreateUserDTO implements IUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsOptional()
  @IsString()
  address: string;
}
