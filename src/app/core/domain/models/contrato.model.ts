import { IDomainEmpleado } from './empleado.model';

export interface IDomainCreateContrato {
  fechaInicio: string;
  fechaFin: string;
  tipoContrato: string;
  empleadoDTO: IDomainEmpleado;
}

export interface IDomainContrato {
  idContrato: number;
  fechaInicio: string;
  fechaFin: string;
  tipoContrato: string;
}