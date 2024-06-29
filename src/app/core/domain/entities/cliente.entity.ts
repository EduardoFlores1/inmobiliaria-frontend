import { IDomainUsuario } from './usuario.entity';

export interface IDomainCreateCliente {
  usuario: IDomainUsuario;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  fechaRegistro: string;
  tipoEstado: string,
  estado: boolean;
}

export interface IDomainCliente extends IDomainCreateCliente{
  idCliente: number;
}