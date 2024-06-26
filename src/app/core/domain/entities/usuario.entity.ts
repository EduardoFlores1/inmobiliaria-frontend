import { EmpleadoEntity } from './empleado.entity';

export interface UsuarioEntity {
  idUsuario: number;
  empleado: EmpleadoEntity;
  username: string;
  password: string;
  rol: string;
  equipoVenta: number;
  fechaRegistro: string;
  estado: boolean;
}