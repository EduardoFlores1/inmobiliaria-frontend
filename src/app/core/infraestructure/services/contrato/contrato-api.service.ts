import { Injectable, inject } from '@angular/core';
import { IContratoApiService } from './contrato-api.interface';
import { Observable, map } from 'rxjs';
import { IDomainContrato, IDomainCreateContrato } from '../../../domain/models/contrato.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { IApiContrato } from '../../entities/contrato-api.entity';
import { ContratoMapper } from '../../mappers/contrato.mapper';

@Injectable({
  providedIn: 'root'
})
export class ContratoApiService implements IContratoApiService{

  private _http = inject(HttpClient);
  private readonly API_URL = `${environment.API_URL}/contratos`;

  readAll(): Observable<IDomainContrato[]> {
    return this._http.get<IApiContrato[]>(this.API_URL)
      .pipe(
        map((list) => list.map(ContratoMapper.fromApiToDomain))
      );
  }
  readById(id: number): Observable<IDomainContrato> {
    return this._http.get<IApiContrato>(`${this.API_URL}/${id}`)
      .pipe(
        map(ContratoMapper.fromApiToDomain)
      );
  }
  create(c: IDomainCreateContrato): Observable<IDomainContrato> {
    return this._http.post<IApiContrato>(`${this.API_URL}`, c)
    .pipe(
      map(ContratoMapper.fromApiToDomain)
    );
  }
  update(id: number, m: IDomainContrato): Observable<IDomainContrato> {
    return this._http.put<IApiContrato>(`${this.API_URL}/${id}`, m)
      .pipe(
        map(ContratoMapper.fromApiToDomain)
      );
  }
  deleteById(id: number): Observable<void> {
    return this._http.delete<void>(`${this.API_URL}/${id}`);
  }
}
