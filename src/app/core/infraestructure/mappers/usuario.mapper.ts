import { IDomainUsuario } from '../../domain/models/usuario.model';
import { IApiUsuario } from '../entities/usuario-api.entity';
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