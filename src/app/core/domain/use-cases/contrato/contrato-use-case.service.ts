import { Inject, Injectable } from '@angular/core';
import { ICommonUseCases } from '../common-use-case.interface';
import { IDomainContrato, IDomainCreateContrato } from '../../models/contrato.model';
import { Observable } from 'rxjs';
import { HTTP_CONTRATO_SERVICE } from '../../../infraestructure/providers/contrato-api.provider';
import { IContratoApiService } from '../../../infraestructure/services/contrato/contrato-api.interface';

@Injectable({
  providedIn: 'root'
})
export class ContratoUseCaseService implements ICommonUseCases<IDomainCreateContrato, IDomainContrato>{

  constructor(@Inject(HTTP_CONTRATO_SERVICE) private _contratoApiService: IContratoApiService) { }

  readAll(): Observable<IDomainContrato[]> {
    // toda logica aqui
    return this._contratoApiService.readAll();
  }
  readById(id: number): Observable<IDomainContrato> {
    return this._contratoApiService.readById(id);
  }
  create(c: IDomainCreateContrato): Observable<IDomainContrato> {
    return this._contratoApiService.create(c);
  }
  update(id: number, e: IDomainContrato): Observable<IDomainContrato> {
    return this._contratoApiService.update(id, e);
  }
  deleteById(id: number): Observable<void> {
    return this._contratoApiService.deleteById(id);
  }
}
