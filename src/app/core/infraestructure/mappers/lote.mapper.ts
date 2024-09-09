import { IDomainLote } from '../../domain/models/lote.model';
import { IApiLote } from '../entities/lote-api.entity';

export class LoteMapper {
  static fromApiToDomain(apiLote: IApiLote): IDomainLote {
    return {
      idLote: apiLote.idLote,
      manzana: apiLote.manzana,
      precio: apiLote.precio,
      fechaIngreso: apiLote.fechaIngreso,
      tipoEstado: apiLote.tipoEstado,
      estado: apiLote.estado
    }
  }
}