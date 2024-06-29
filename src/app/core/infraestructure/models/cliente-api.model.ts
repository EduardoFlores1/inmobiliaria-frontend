import { IApiUsuario } from './usuario-api.model';

export interface IApiCreateCliente {
  readonly usuario: IApiUsuario;
  readonly nombre: string;
  readonly apellido: string;
  readonly dni: string;
  readonly telefono: string;
  readonly email: string;
  readonly fechaRegistro: string;
  readonly tipoEstado: string,
  readonly estado: boolean;
}

export interface IApiCliente extends IApiCreateCliente{
  readonly idCliente: number;
}