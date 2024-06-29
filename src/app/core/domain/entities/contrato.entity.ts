import { IDomainEmpleado } from './empleado.entity';

export interface IDomainCreateContrato {
  empleado: IDomainEmpleado;
  fechaInicio: string;
  fechaFin: string;
  tipoContrato: string;
}

export interface IDomainContrato extends IDomainCreateContrato {
  idContrato: number;
}