import { IApiContrato, IApiCreateContrato } from './contrato-api.entity';

export interface IApiCreateEmpleado {
  readonly nombre: string;
  readonly apellido: string;
  readonly email: string;
  readonly dni: string;
  readonly telefono: string;
  readonly direccion: string;
  readonly fechaContratacion: string;
  readonly cargo: string;
  readonly estado: boolean;
  readonly contratoCreateDTO: IApiCreateContrato;
}

export interface IApiEmpleado{
  readonly idEmpleado: number;
  readonly nombre: string;
  readonly apellido: string;
  readonly email: string;
  readonly dni: string;
  readonly telefono: string;
  readonly direccion: string;
  readonly fechaContratacion: string;
  readonly cargo: string;
  readonly estado: boolean;
  readonly contratoDTO: IApiContrato;
}