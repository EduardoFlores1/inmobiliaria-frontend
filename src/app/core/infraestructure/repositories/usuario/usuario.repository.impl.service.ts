import { Injectable, inject } from '@angular/core';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { Observable } from 'rxjs';
import { UsuarioEntity } from '../../../domain/entities/usuario.entity';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UsuarioCreateDTO } from '../../../domain/dtos/usuario-create.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRepositoryImplService extends UsuarioRepository {

  private URL = `${environment.API_URL}/v1/usuarios`;
  private _httpClient = inject(HttpClient);

  constructor() {
    super();
  }

  override create(e: UsuarioCreateDTO): Observable<UsuarioEntity> {
    return this._httpClient.post<UsuarioEntity>(`${this.URL}/generic`, e);
  }
  override readAll(): Observable<UsuarioEntity[]> {
    return this._httpClient.get<UsuarioEntity[]>(`${this.URL}/generic`);
  }
  override readById(id: number): Observable<UsuarioEntity> {
    throw new Error('Method not implemented.');
  }
  override update(id: number, e: UsuarioEntity): Observable<UsuarioEntity> {
    throw new Error('Method not implemented.');
  }
  override deleteById(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
   
}
