import { IAddress } from './IAddress';

export interface IResutaurant {
  id: number;
  nome: string;
  descricao: string;
  cnpj: string;
  nota: number;
  endereco: IAddress
}
