import { Observable, map } from 'rxjs';
import { IApiEmpleado } from '../../entities/empleado-api.entity';
import { IEmpleadoApiService } from './empleado-api.interface';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { IDomainEmpleado, IDomainCreateEmpleado } from '../../../domain/models/empleado.model';
import { EmpleadoMapper } from '../../mappers/empleado.mapper';
import { ResponseDTO } from '../../util/ResponseDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoApiService implements IEmpleadoApiService {

  private _http = inject(HttpClient);
  private readonly API_URL = `${environment.API_URL}/api/v1/empleados`;

  readAll(): Observable<IDomainEmpleado[]> {
    return this._http.get<ResponseDTO<IApiEmpleado[]>>(this.API_URL)
      .pipe(
        map((response) => response.data.map(EmpleadoMapper.fromApiToDomain))
      );
  }
  readById(id: number): Observable<IDomainEmpleado> {
    return this._http.get<ResponseDTO<IApiEmpleado>>(`${this.API_URL}/${id}`)
      .pipe(
        map((response) => EmpleadoMapper.fromApiToDomain(response.data))
      );
  }
  create(c: IDomainCreateEmpleado): Observable<IDomainEmpleado> {
    return this._http.post<ResponseDTO<IApiEmpleado>>(`${this.API_URL}`, c)
    .pipe(
      map((response) => EmpleadoMapper.fromApiToDomain(response.data))
    );
  }
  update(id: number, m: IDomainEmpleado): Observable<IDomainEmpleado> {
    return this._http.put<ResponseDTO<IApiEmpleado>>(`${this.API_URL}/${id}`, m)
      .pipe(
        map((response) => EmpleadoMapper.fromApiToDomain(response.data))
      );
  }
  deleteById(id: number): Observable<void> {
    return this._http.delete<ResponseDTO<void>>(`${this.API_URL}/${id}`)
      .pipe(
        map(() => undefined)
      );
  }

}
