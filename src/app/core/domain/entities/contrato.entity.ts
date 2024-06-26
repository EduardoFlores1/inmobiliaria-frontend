import { EmpleadoEntity } from './empleado.entity';

export interface ContratoEntity {
  idContrato: number;
  empleado: EmpleadoEntity;
  fechaInicio: string;
  fechaFin: string;
  tipoContrato: string;
}