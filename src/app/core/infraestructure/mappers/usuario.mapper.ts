import { IDomainUsuario } from '../../domain/entities/usuario.entity';
import { IApiUsuario } from '../models/usuario-api.model';
import { EmpleadoMapper } from './empleado.mapper';

export class UsuarioMapper {
  static fromApiToDomain(apiUsuario: IApiUsuario): IDomainUsuario {
    return {
      idUsuario: apiUsuario.idUsuario,
      empleado: EmpleadoMapper.fromApiToDomain(apiUsuario.empleado),
      username: apiUsuario.username,
      password: apiUsuario.password,
      rol: apiUsuario.rol,
      equipoVenta: apiUsuario.equipoVenta,
      fechaRegistro: apiUsuario.fechaRegistro,
      estado: apiUsuario.estado,
    }
  }
}