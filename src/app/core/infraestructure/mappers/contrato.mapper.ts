import { IDomainContrato } from '../../domain/models/contrato.model';
import { IApiContrato } from '../entities/contrato-api.entity';

export class ContratoMapper {
  static fromApiToDomain(apiContrato: IApiContrato): IDomainContrato {
    return {
      idContrato: apiContrato.idContrato,
      fechaInicio: apiContrato.fechaFin,
      fechaFin: apiContrato.fechaFin,
      tipoContrato: apiContrato.tipoContrato,
    }
  }
}