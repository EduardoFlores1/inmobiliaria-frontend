import { IDomainEmpleado } from './empleado.model';

export interface IDomainCreateContrato {
  empleado: IDomainEmpleado;
  fechaInicio: string;
  fechaFin: string;
  tipoContrato: string;
}

export interface IDomainContrato extends IDomainCreateContrato {
  idContrato: number;
}