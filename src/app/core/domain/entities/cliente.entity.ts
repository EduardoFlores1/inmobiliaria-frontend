import { UsuarioEntity } from './usuario.entity';

export interface ClienteEntity {
  idCliente: number;
  usuario: UsuarioEntity;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  fechaRegistro: string;
  estado: boolean;
}