import { Inject, Injectable } from '@angular/core';
import { ICommonUseCases } from '../common-use-case.interface';
import { IDomainCreateEmpleado, IDomainEmpleado } from '../../entities/empleado.entity';
import { Observable } from 'rxjs';
import { HTTP_EMPLEADO_SERVICE } from '../../../infraestructure/providers/empleado-api.provider';
import { IEmpleadoApiService } from '../../../infraestructure/services/empleado/empleado-api.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoUseCaseService implements ICommonUseCases<IDomainCreateEmpleado, IDomainEmpleado>{

  constructor(@Inject(HTTP_EMPLEADO_SERVICE) private _empleadoApiService: IEmpleadoApiService) { }

  readAll(): Observable<IDomainEmpleado[]> {
    // toda logica aqui...
    return this._empleadoApiService.readAll()
  }
  readById(id: number): Observable<IDomainEmpleado> {
    return this._empleadoApiService.readById(id);
  }
  create(c: IDomainCreateEmpleado): Observable<IDomainEmpleado> {
    return this._empleadoApiService.create(c);
  }
  update(id: number, e: IDomainEmpleado): Observable<IDomainEmpleado> {
    return this._empleadoApiService.update(id, e);
  }
  deleteById(id: number): Observable<void> {
    return this._empleadoApiService.deleteById(id);
  }
}
