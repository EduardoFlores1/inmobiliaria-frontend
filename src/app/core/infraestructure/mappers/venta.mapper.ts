import { IDomainVenta } from '../../domain/models/venta.model';
import { IApiVenta } from '../entities/venta-api.entity';
import { ClienteMapper } from './cliente.mapper';
import { LoteMapper } from './lote.mapper';
import { TipoLoteMapper } from './tipo-lote.mapper';
import { UsuarioMapper } from './usuario.mapper';

export class VentaMapper {
  static fromApiToDomain(apiVenta: IApiVenta): IDomainVenta {
    return {
      idVenta: apiVenta.idVenta,
      usuario: UsuarioMapper.fromApiToDomain(apiVenta.usuario),
      cliente: ClienteMapper.fromApiToDomain(apiVenta.cliente),
      lote: LoteMapper.fromApiToDomain(apiVenta.lote),
      tipoLote: TipoLoteMapper.fromApiToDomain(apiVenta.tipoLote),
      fechaVenta: apiVenta.fechaVenta,
      detalles: apiVenta.detalles,
    }
  }
}