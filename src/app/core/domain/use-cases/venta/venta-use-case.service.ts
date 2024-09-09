import { Inject, Injectable } from '@angular/core';
import { ICommonUseCases } from '../common-use-case.interface';
import { IDomainCreateVenta, IDomainVenta } from '../../models/venta.model';
import { Observable } from 'rxjs';
import { HTTP_VENTA_SERVICE } from '../../../infraestructure/providers/venta-api.provider';
import { IVentaApiService } from '../../../infraestructure/services/venta/venta-api.interface';
import { IDomainCliente } from '../../models/cliente.model';
import { IDomainLote } from '../../models/lote.model';
import { IDomainTipoLote } from '../../models/tipo-lote.model';

@Injectable({
  providedIn: 'root'
})
export class VentaUseCaseService implements ICommonUseCases<IDomainCreateVenta, IDomainVenta>{

  constructor(@Inject(HTTP_VENTA_SERVICE) private _ventaApiService: IVentaApiService) { }


  //others
  listClientesOk(estado: boolean): Observable<IDomainCliente[]> {
    return this._ventaApiService.listClientesOk(estado);
  }
  listLotesOk(tipoEstado: string): Observable<IDomainLote[]> {
    return this._ventaApiService.listLotesOk(tipoEstado);
  }
  listTipoLotesOk(): Observable<IDomainTipoLote[]> {
    return this._ventaApiService.listTipoLotesOk();
  }
  //others

  readAll(): Observable<IDomainVenta[]> {
    return this._ventaApiService.readAll();
  }
  readById(id: number): Observable<IDomainVenta> {
    return this._ventaApiService.readById(id);
  }
  create(c: IDomainCreateVenta): Observable<IDomainVenta> {
    return this._ventaApiService.create(c);
  }
  update(id: number, e: IDomainVenta): Observable<IDomainVenta> {
    return this._ventaApiService.update(id, e);
  }
  deleteById(id: number): Observable<void> {
    return this._ventaApiService.deleteById(id);
  }
}
