import { Inject, Injectable } from '@angular/core';
import { ICommonUseCases } from '../common-use-case.interface';
import { IDomainCreateUsuario, IDomainUsuario } from '../../entities/usuario.entity';
import { Observable } from 'rxjs';
import { HTTP_USUARIO_SERVICE } from '../../../infraestructure/providers/usuario-api.provider';
import { IUsuarioApiService } from '../../../infraestructure/services/usuario/usuario-api.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioUseCaseService implements ICommonUseCases<IDomainCreateUsuario, IDomainUsuario>{

  constructor(@Inject(HTTP_USUARIO_SERVICE) private _usuarioApiService: IUsuarioApiService) { }

  readAll(): Observable<IDomainUsuario[]> {
    // toda logica aqui...
    return this._usuarioApiService.readAll();
  }
  readById(id: number): Observable<IDomainUsuario> {
    return this._usuarioApiService.readById(id);
  }
  create(c: IDomainCreateUsuario): Observable<IDomainUsuario> {
    return this._usuarioApiService.create(c);
  }
  update(id: number, e: IDomainUsuario): Observable<IDomainUsuario> {
    return this._usuarioApiService.update(id, e);
  }
  deleteById(id: number): Observable<void> {
    return this._usuarioApiService.deleteById(id);
  }
}
