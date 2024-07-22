import { Injectable, inject } from '@angular/core';
import { IClienteApiService } from './cliente-api.interface';
import { Observable, map } from 'rxjs';
import { IDomainCliente, IDomainCreateCliente } from '../../../domain/models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { IApiCliente } from '../../entities/cliente-api.entity';
import { ClienteMapper } from '../../mappers/cliente.mapper';
import { ResponseDTO } from '../../util/ResponseDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteApiService implements IClienteApiService{

  private _http = inject(HttpClient);
  private readonly API_URL = `${environment.API_URL}/clientes`;

  readAll(): Observable<IDomainCliente[]> {
    return this._http.get<ResponseDTO<IApiCliente[]>>(this.API_URL)
      .pipe(
        map((response) => response.data.map(ClienteMapper.fromApiToDomain))
      );
  }
  readById(id: number): Observable<IDomainCliente> {
    return this._http.get<ResponseDTO<IApiCliente>>(`${this.API_URL}/${id}`)
      .pipe(
        map((response) => ClienteMapper.fromApiToDomain(response.data))
      );
  }
  create(c: IDomainCreateCliente): Observable<IDomainCliente> {
    return this._http.post<ResponseDTO<IApiCliente>>(`${this.API_URL}`, c)
    .pipe(
      map((response) => ClienteMapper.fromApiToDomain(response.data))
    );
  }
  update(id: number, m: IDomainCliente): Observable<IDomainCliente> {
    return this._http.put<ResponseDTO<IApiCliente>>(`${this.API_URL}/${id}`, m)
      .pipe(
        map((response) => ClienteMapper.fromApiToDomain(response.data))
      );
  }
  deleteById(id: number): Observable<void> {
    return this._http.delete<ResponseDTO<void>>(`${this.API_URL}/${id}`)
      .pipe(
        map(() => undefined)
      );
  }
}
