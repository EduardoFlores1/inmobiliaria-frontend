import { IDomainCliente } from '../../domain/entities/cliente.entity';
import { IApiCliente } from '../models/cliente-api.model';
import { UsuarioMapper } from './usuario.mapper';

export class ClienteMapper {
  static fromApiToDomain(apiCliente: IApiCliente): IDomainCliente {
    return {
      idCliente: apiCliente.idCliente,
      usuario: UsuarioMapper.fromApiToDomain(apiCliente.usuario),
      nombre: apiCliente.nombre,
      apellido: apiCliente.apellido,
      dni: apiCliente.dni,
      telefono: apiCliente.telefono,
      email: apiCliente.email,
      fechaRegistro: apiCliente.fechaRegistro,
      tipoEstado: apiCliente.tipoEstado,
      estado: apiCliente.estado,
    }
  }
}