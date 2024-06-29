import { IDomainContrato } from '../../domain/entities/contrato.entity';
import { IApiContrato } from '../models/contrato-api.model';
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