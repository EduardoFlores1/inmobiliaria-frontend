import { Observable } from 'rxjs';
import { IDomainCreateVenta, IDomainVenta } from '../../../domain/models/venta.model';
import { ICommonApiService } from '../common-api.interface';
import { IDomainCliente } from '../../../domain/models/cliente.model';
import { IDomainLote } from '../../../domain/models/lote.model';
import { IDomainTipoLote } from '../../../domain/models/tipo-lote.model';

export interface IVentaApiService extends ICommonApiService<IDomainCreateVenta, IDomainVenta>{
  listClientesOk(estado: boolean): Observable<IDomainCliente[]>
  listLotesOk(tipoEstado: string): Observable<IDomainLote[]>
  listTipoLotesOk(): Observable<IDomainTipoLote[]>
}