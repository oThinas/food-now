import { IAddress } from './IAddress';

export interface IUser {
  id: number;
  telefone: number;
  cpf: number;
  nome: string;
  email: string;
  endereco: IAddress;
  idade: number;
}
