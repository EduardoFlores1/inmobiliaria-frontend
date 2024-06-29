import { IApiEmpleado } from './empleado-api.model';

export interface IApiCreateContrato {
  readonly empleado: IApiEmpleado;
  readonly fechaInicio: string;
  readonly fechaFin: string;
  readonly tipoContrato: string;
}

export interface IApiContrato extends IApiCreateContrato {
  readonly idContrato: number;
}