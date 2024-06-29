import { IDomainContrato } from '../../domain/models/contrato.model';
import { IApiContrato } from '../entities/contrato-api.entity';
import { EmpleadoMapper } from './empleado.mapper';

export class ContratoMapper {
  static fromApiToDomain(apiContrato: IApiContrato): IDomainContrato {
    return {
      idContrato: apiContrato.idContrato,
      empleado: EmpleadoMapper.fromApiToDomain(apiContrato.empleado),
      fechaInicio: apiContrato.fechaFin,
      fechaFin: apiContrato.fechaFin,
      tipoContrato: apiContrato.tipoContrato,
    }
  }
}