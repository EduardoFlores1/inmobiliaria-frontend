import { inject, Injectable } from '@angular/core';
import { IVentaApiService } from './venta-api.interface';
import { map, Observable } from 'rxjs';
import { IDomainVenta, IDomainCreateVenta } from '../../../domain/models/venta.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { ResponseDTO } from '../../util/ResponseDTO.interface';
import { IApiVenta } from '../../entities/venta-api.entity';
import { VentaMapper } from '../../mappers/venta.mapper';
import { IDomainCliente } from '../../../domain/models/cliente.model';
import { IDomainLote } from '../../../domain/models/lote.model';
import { IDomainTipoLote } from '../../../domain/models/tipo-lote.model';
import { IApiCliente } from '../../entities/cliente-api.entity';
import { IApiLote } from '../../entities/lote-api.entity';
import { IApiTipoLote } from '../../entities/tipo-lote-api.entity';
import { TipoLoteMapper } from '../../mappers/tipo-lote.mapper';
import { LoteMapper } from '../../mappers/lote.mapper';
import { ClienteMapper } from '../../mappers/cliente.mapper';

@Injectable({
  providedIn: 'root'
})
export class VentaApiService implements IVentaApiService{

  constructor() { }

  private _http = inject(HttpClient);
  private readonly API_URL = `${environment.API_URL}/api/v1/ventas`;

  //others

  listClientesOk(estado: boolean): Observable<IDomainCliente[]> {
    return this._http.get<ResponseDTO<IApiCliente[]>>(`${this.API_URL}/cliente/${estado}`)
      .pipe(
        map((response) => response.data.map(ClienteMapper.fromApiToDomain))
      );
  }

  listLotesOk(tipoEstado: string): Observable<IDomainLote[]> {
    return this._http.get<ResponseDTO<IApiLote[]>>(`${this.API_URL}/lote/${tipoEstado}`)
      .pipe(
        map((response) => response.data.map(LoteMapper.fromApiToDomain))
      );
  }

  listTipoLotesOk(): Observable<IDomainTipoLote[]> {
    return this._http.get<ResponseDTO<IApiTipoLote[]>>(`${this.API_URL}/tipoLote`)
      .pipe(
        map((response) => response.data.map(TipoLoteMapper.fromApiToDomain))
      );
  }

  //others

  readAll(): Observable<IDomainVenta[]> {
    return this._http.get<ResponseDTO<IApiVenta[]>>(this.API_URL)
      .pipe(
        map((response) => response.data.map(VentaMapper.fromApiToDomain))
      );
  }
  readById(id: number): Observable<IDomainVenta> {
    return this._http.get<ResponseDTO<IApiVenta>>(`${this.API_URL}/${id}`)
      .pipe(
        map((response) => VentaMapper.fromApiToDomain(response.data))
      );
  }
  create(c: IDomainCreateVenta): Observable<IDomainVenta> {
    return this._http.post<ResponseDTO<IApiVenta>>(`${this.API_URL}`, c)
    .pipe(
      map((response) => VentaMapper.fromApiToDomain(response.data))
    );
  }
  update(id: number, m: IDomainVenta): Observable<IDomainVenta> {
    return this._http.put<ResponseDTO<IApiVenta>>(`${this.API_URL}/${id}`, m)
      .pipe(
        map((response) => VentaMapper.fromApiToDomain(response.data))
      );
  }
  deleteById(id: number): Observable<void> {
    return this._http.delete<ResponseDTO<void>>(`${this.API_URL}/${id}`)
    .pipe(
      map(() => undefined)
    );
  }
}
