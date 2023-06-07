import { IAddress } from './IAddress';

export interface IOrder {
  id: number;
  consumidor_id: number;
  restaurante_id: number;
  produto_id: number;
  status: string;
  endereco: IAddress;
}
