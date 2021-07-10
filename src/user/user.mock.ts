import { UserGender } from './user.interface';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

export const userData: User = {
  id: 'id',
  name: 'user name',
  email: 'user@email.com',
  gender: UserGender.L,
  address: 'California',
};

export const createUserDto: CreateUserDTO = {
  name: userData.name,
  email: userData.email,
  gender: userData.gender,
  address: userData.address,
};

export const updateUserDto: UpdateUserDTO = {
  name: userData.name + 'updated',
};
