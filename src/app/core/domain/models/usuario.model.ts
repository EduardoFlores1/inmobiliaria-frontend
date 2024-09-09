import { IDomainEmpleado } from './empleado.model';

export interface IDomainCreateUsuario {
  username: string;
  password: string;
  rol: string;
  equipoVenta: number;
  fechaRegistro: string;
  estado: boolean;
  empleadoDTO: IDomainEmpleado;
}

export interface IDomainUsuario{
  idUsuario: number;
  username: string;
  rol: string;
  equipoVenta: number;
  fechaRegistro: string;
  estado: boolean;
  empleadoDTO: IDomainEmpleado;
}