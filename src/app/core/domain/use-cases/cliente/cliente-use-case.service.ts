import { Inject, Injectable } from '@angular/core';
import { ICommonUseCases } from '../common-use-case.interface';
import { IDomainCliente, IDomainCreateCliente } from '../../models/cliente.model';
import { Observable } from 'rxjs';
import { HTTP_CLIENTE_SERVICE } from '../../../infraestructure/providers/cliente-api.provider';
import { IClienteApiService } from '../../../infraestructure/services/cliente/cliente-api.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteUseCaseService implements ICommonUseCases<IDomainCreateCliente, IDomainCliente>{

  constructor(@Inject(HTTP_CLIENTE_SERVICE) private _clienteApiService: IClienteApiService) { }

  readAll(): Observable<IDomainCliente[]> {
    return this._clienteApiService.readAll();
  }
  readById(id: number): Observable<IDomainCliente> {
    return this._clienteApiService.readById(id);
  }
  create(c: IDomainCreateCliente): Observable<IDomainCliente> {
    return this._clienteApiService.create(c);
  }
  update(id: number, e: IDomainCliente): Observable<IDomainCliente> {
    return this._clienteApiService.update(id, e);
  }
  deleteById(id: number): Observable<void> {
    return this._clienteApiService.deleteById(id);
  }
}
