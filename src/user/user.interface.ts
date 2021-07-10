export enum UserGender {
  L = 'Laki-Laki',
  P = 'Perempuan',
}

export interface IUser {
  name: string;
  email: string;
  gender: UserGender;
  address: string;
}
