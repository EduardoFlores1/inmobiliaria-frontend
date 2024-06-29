import { Injectable, inject } from '@angular/core';
import { IUsuarioApiService } from './usuario-api.interface';
import { Observable, map } from 'rxjs';
import { IDomainUsuario, IDomainCreateUsuario } from '../../../domain/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { IApiUsuario } from '../../entities/usuario-api.entity';
import { UsuarioMapper } from '../../mappers/usuario.mapper';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService implements IUsuarioApiService{

  private _http = inject(HttpClient);
  private readonly API_URL = `${environment.API_URL}/usuarios`;

  readAll(): Observable<IDomainUsuario[]> {
    return this._http.get<IApiUsuario[]>(this.API_URL)
      .pipe(
        map((list) => list.map(UsuarioMapper.fromApiToDomain))
      );
  }
  readById(id: number): Observable<IDomainUsuario> {
    return this._http.get<IApiUsuario>(`${this.API_URL}/${id}`)
      .pipe(
        map(UsuarioMapper.fromApiToDomain)
      );
  }
  create(c: IDomainCreateUsuario): Observable<IDomainUsuario> {
    return this._http.post<IApiUsuario>(`${this.API_URL}`, c)
    .pipe(
      map(UsuarioMapper.fromApiToDomain)
    );
  }
  update(id: number, m: IDomainUsuario): Observable<IDomainUsuario> {
    return this._http.put<IApiUsuario>(`${this.API_URL}/${id}`, m)
      .pipe(
        map(UsuarioMapper.fromApiToDomain)
      );
  }
  deleteById(id: number): Observable<void> {
    return this._http.delete<void>(`${this.API_URL}/${id}`);
  }
}
