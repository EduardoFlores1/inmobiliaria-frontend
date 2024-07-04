import { IDomainContrato, IDomainCreateContrato } from './contrato.model';

export interface IDomainCreateEmpleado {
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  telefono: string;
  direccion: string;
  fechaContratacion: string;
  cargo: string;
  estado: boolean;
  contratoCreateDTO: IDomainCreateContrato;
}

export interface IDomainEmpleado{
  idEmpleado: number;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  telefono: string;
  direccion: string;
  fechaContratacion: string;
  cargo: string;
  estado: boolean;
  contratoDTO: IDomainContrato;
}