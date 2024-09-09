import { IApiEmpleado } from './empleado-api.entity';

export interface IApiCreateUsuario {
  readonly username: string;
  readonly password: string;
  readonly rol: string;
  readonly equipoVenta: number;
  readonly fechaRegistro: string;
  readonly estado: boolean;
  readonly empleadoDTO: IApiEmpleado;
}

export interface IApiUsuario{
  readonly idUsuario: number;
  readonly username: string;
  readonly rol: string;
  readonly equipoVenta: number;
  readonly fechaRegistro: string;
  readonly estado: boolean;
  readonly empleadoDTO: IApiEmpleado;
}