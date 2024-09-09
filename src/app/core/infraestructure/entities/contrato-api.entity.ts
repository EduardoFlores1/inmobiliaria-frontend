import { IApiEmpleado } from './empleado-api.entity';

export interface IApiCreateContrato {
  readonly fechaInicio: string;
  readonly fechaFin: string;
  readonly tipoContrato: string;
  readonly empleadoDTO: IApiEmpleado;
}

export interface IApiContrato {
  readonly idContrato: number;
  readonly fechaInicio: string;
  readonly fechaFin: string;
  readonly tipoContrato: string;
}