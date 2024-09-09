import { IDomainEmpleado } from './empleado.model';

export interface IDomainCreateContrato {
  fechaInicio: string;
  fechaFin: string;
  tipoContrato: string;
}

export interface IDomainContrato {
  idContrato: number;
  fechaInicio: string;
  fechaFin: string;
  tipoContrato: string;
}