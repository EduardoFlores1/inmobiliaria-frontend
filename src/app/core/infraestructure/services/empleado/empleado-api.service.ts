import { Observable, map, pipe } from 'rxjs';
import { IApiEmpleado } from '../../models/empleado-api.model';
import { IEmpleadoApiService } from './empleado-api.interface';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { IDomainEmpleado, IDomainCreateEmpleado } from '../../../domain/entities/empleado.entity';
import { EmpleadoMapper } from '../../mappers/empleado.mapper';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoApiService implements IEmpleadoApiService {

  private _http = inject(HttpClient);
  private readonly API_URL = `${environment.API_URL}/empleados`;

  readAll(): Observable<IDomainEmpleado[]> {
    return this._http.get<IApiEmpleado[]>(this.API_URL)
      .pipe(
        map((list) => list.map(EmpleadoMapper.fromApiToDomain))
      );
  }
  readById(id: number): Observable<IDomainEmpleado> {
    return this._http.get<IApiEmpleado>(`${this.API_URL}/${id}`)
      .pipe(
        map(EmpleadoMapper.fromApiToDomain)
      );
  }
  create(c: IDomainCreateEmpleado): Observable<IDomainEmpleado> {
    return this._http.post<IApiEmpleado>(`${this.API_URL}`, c)
    .pipe(
      map(EmpleadoMapper.fromApiToDomain)
    );
  }
  update(id: number, m: IDomainEmpleado): Observable<IDomainEmpleado> {
    return this._http.put<IApiEmpleado>(`${this.API_URL}/${id}`, m)
      .pipe(
        map(EmpleadoMapper.fromApiToDomain)
      );
  }
  deleteById(id: number): Observable<void> {
    return this._http.delete<void>(`${this.API_URL}/${id}`);
  }

}
