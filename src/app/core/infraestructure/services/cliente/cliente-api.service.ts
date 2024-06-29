import { Injectable, inject } from '@angular/core';
import { IClienteApiService } from './cliente-api.interface';
import { Observable, map } from 'rxjs';
import { IDomainCliente, IDomainCreateCliente } from '../../../domain/entities/cliente.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { IApiCliente } from '../../models/cliente-api.model';
import { ClienteMapper } from '../../mappers/cliente.mapper';

@Injectable({
  providedIn: 'root'
})
export class ClienteApiService implements IClienteApiService{

  private _http = inject(HttpClient);
  private readonly API_URL = `${environment.API_URL}/clientes`;

  readAll(): Observable<IDomainCliente[]> {
    return this._http.get<IApiCliente[]>(this.API_URL)
      .pipe(
        map((list) => list.map(ClienteMapper.fromApiToDomain))
      );
  }
  readById(id: number): Observable<IDomainCliente> {
    return this._http.get<IApiCliente>(`${this.API_URL}/${id}`)
      .pipe(
        map(ClienteMapper.fromApiToDomain)
      );
  }
  create(c: IDomainCreateCliente): Observable<IDomainCliente> {
    return this._http.post<IApiCliente>(`${this.API_URL}`, c)
    .pipe(
      map(ClienteMapper.fromApiToDomain)
    );
  }
  update(id: number, m: IDomainCliente): Observable<IDomainCliente> {
    return this._http.put<IApiCliente>(`${this.API_URL}/${id}`, m)
      .pipe(
        map(ClienteMapper.fromApiToDomain)
      );
  }
  deleteById(id: number): Observable<void> {
    return this._http.delete<void>(`${this.API_URL}/${id}`);
  }
}
