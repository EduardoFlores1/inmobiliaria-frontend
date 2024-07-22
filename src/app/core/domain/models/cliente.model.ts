import { IDomainUsuario } from './usuario.model';

export interface IDomainCreateCliente {
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  fechaRegistro: string;
  tipoEstado: string,
  estado: boolean;
  usuarioDTO: IDomainUsuario;
}

export interface IDomainCliente{
  idCliente: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  fechaRegistro: string;
  tipoEstado: string,
  estado: boolean;
}