import { IDomainTipoLote } from '../../domain/models/tipo-lote.model';
import { IApiTipoLote } from '../entities/tipo-lote-api.entity';

export class TipoLoteMapper {
  static fromApiToDomain(apiTipoLote: IApiTipoLote): IDomainTipoLote {
    return {
      idTipoLote: apiTipoLote.idTipoLote,
      tipoPago: apiTipoLote.tipoPago,
      descripcion: apiTipoLote.descripcion
    }
  }
}