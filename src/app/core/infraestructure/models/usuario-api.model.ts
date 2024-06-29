import { IApiEmpleado } from './empleado-api.model';

export interface IApiCreateUsuario {
  readonly empleado: IApiEmpleado;
  readonly username: string;
  readonly password: string;
  readonly rol: string;
  readonly equipoVenta: number;
  readonly fechaRegistro: string;
  readonly estado: boolean;
}

export interface IApiUsuario extends IApiCreateUsuario{
  readonly idUsuario: number;
}