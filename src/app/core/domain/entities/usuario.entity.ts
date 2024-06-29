import { IDomainEmpleado } from './empleado.entity';

export interface IDomainCreateUsuario {
  empleado: IDomainEmpleado;
  username: string;
  password: string;
  rol: string;
  equipoVenta: number;
  fechaRegistro: string;
  estado: boolean;
}

export interface IDomainUsuario extends IDomainCreateUsuario{
  idUsuario: number;
}