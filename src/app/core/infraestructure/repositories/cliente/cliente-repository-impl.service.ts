import { Injectable, inject } from '@angular/core';
import { ClienteRepository } from '../../../domain/repositories/cliente.repository';
import { Observable } from 'rxjs';
import { ClienteCreateDTO } from '../../../domain/dtos/cliente-create.dto';
import { ClienteEntity } from '../../../domain/entities/cliente.entity';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteRepositoryImplService extends ClienteRepository{

  private URL = `${environment.API_URL}/v1/clientes`;
  private _httpClient = inject(HttpClient);

  constructor() {
    super();
  }

  override create(e: ClienteCreateDTO): Observable<ClienteEntity> {
    return this._httpClient.post<ClienteEntity>(`${this.URL}/generic`, e);
  }
  override readAll(): Observable<ClienteEntity[]> {
    return this._httpClient.get<ClienteEntity[]>(`${this.URL}/generic`);
  }
  override readById(id: number): Observable<ClienteEntity> {
    throw new Error('Method not implemented.');
  }
  override update(id: number, e: ClienteEntity): Observable<ClienteEntity> {
    throw new Error('Method not implemented.');
  }
  override deleteById(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }

  
}
