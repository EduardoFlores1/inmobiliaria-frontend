import { Injectable, inject } from '@angular/core';
import { EmpleadoRepository } from '../../../domain/repositories/empleado.repository';
import { Observable } from 'rxjs';
import { EmpleadoEntity } from '../../../domain/entities/empleado.entity';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { EmpleadoCreateDTO } from '../../../domain/dtos/empleado-create.dto';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoRepositoryImplService extends EmpleadoRepository {

  private URL = `${environment.API_URL}/v1/empleados`;
  private _httpClient = inject(HttpClient);

  constructor() {
    super();
  }

  override create(e: EmpleadoCreateDTO): Observable<EmpleadoEntity> {
    return this._httpClient.post<EmpleadoEntity>(`${this.URL}/generic`, e);
  }
  override readAll(): Observable<EmpleadoEntity[]> {
    return this._httpClient.get<EmpleadoEntity[]>(`${this.URL}/generic`);
  }
  override readById(id: number): Observable<EmpleadoEntity> {
    throw new Error('Method not implemented.');
  }
  override update(id: number, e: EmpleadoEntity): Observable<EmpleadoEntity> {
    throw new Error('Method not implemented.');
  }
  override deleteById(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
  
}
