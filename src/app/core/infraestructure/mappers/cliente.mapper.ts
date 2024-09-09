import { IDomainCliente } from '../../domain/models/cliente.model';
import { IApiCliente } from '../entities/cliente-api.entity';

export class ClienteMapper {
  static fromApiToDomain(apiCliente: IApiCliente): IDomainCliente {
    return {
      idCliente: apiCliente.idCliente,
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