import { IApiUsuario } from './usuario-api.entity';

export interface IApiCreateCliente {
  readonly nombre: string;
  readonly apellido: string;
  readonly dni: string;
  readonly telefono: string;
  readonly email: string;
  readonly fechaRegistro: string;
  readonly tipoEstado: string,
  readonly estado: boolean;
  readonly usuarioDTO: IApiUsuario;
}

export interface IApiCliente{
  readonly idCliente: number;
  readonly nombre: string;
  readonly apellido: string;
  readonly dni: string;
  readonly telefono: string;
  readonly email: string;
  readonly fechaRegistro: string;
  readonly tipoEstado: string,
  readonly estado: boolean;
}