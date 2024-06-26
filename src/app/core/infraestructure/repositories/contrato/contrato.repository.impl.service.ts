import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { ContratoRepository } from '../../../domain/repositories/contrato.repository';
import { Observable } from 'rxjs';
import { ContratoEntity } from '../../../domain/entities/contrato.entity';
import { HttpClient } from '@angular/common/http';
import { ContratoCreateDTO } from '../../../domain/dtos/contrato-create.dto';

@Injectable({
  providedIn: 'root'
})
export class ContratoRepositoryImplService extends ContratoRepository {

  private URL = `${environment.API_URL}/v1/contratos`;
  private _httpClient = inject(HttpClient);

  constructor() {
    super();
  }
  
  override create(e: ContratoCreateDTO): Observable<ContratoEntity> {
    return this._httpClient.post<ContratoEntity>(`${this.URL}/generic`, e);
  }
  override readAll(): Observable<ContratoEntity[]> {
    return this._httpClient.get<ContratoEntity[]>(`${this.URL}/generic`);
  }
  override readById(id: number): Observable<ContratoEntity> {
    throw new Error('Method not implemented.');
  }
  override update(id: number, e: ContratoEntity): Observable<ContratoEntity> {
    throw new Error('Method not implemented.');
  }
  override deleteById(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }


}
