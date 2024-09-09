import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../../domain/models/login.model';
import { ResponseDTO } from '../../../infraestructure/util/ResponseDTO.interface';
import { environment } from '../../../../../environments/environment.development';
import { IApiUsuario } from '../../../infraestructure/entities/usuario-api.entity';
import { UsuarioMapper } from '../../../infraestructure/mappers/usuario.mapper';
import { IDomainUsuario } from '../../../domain/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _tokenService = inject(TokenService);
  private _httpClient = inject(HttpClient);

  private readonly API_URL = `${environment.API_URL}/api/v1/auth`;


  constructor() { }

  private saveUserStorage(usuario: IDomainUsuario) {
    const usuarioString = JSON.stringify(usuario);
    try {
      localStorage.setItem('usuario', usuarioString)
    } catch (error) {
      console.log('El usuario no se ha podido guardar en el localstorage', error);
    }
  }

  obtenerUserStorage() {
    try {
      const usuarioString = localStorage.getItem('usuario');
      if(usuarioString!== null) {
        const usuarioObjeto: IDomainUsuario = JSON.parse(usuarioString);
        return usuarioObjeto;
      }else {
        return null
      }
    } catch (error) {
      console.log('El usuario no se ha podido guardar en el localstorage', error);
      return null;
    }
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this._httpClient.post<ResponseDTO<LoginResponse>>(`${this.API_URL}/login`, request)
      .pipe(
        tap((response) => this._tokenService.saveToken(response.data.token)),
        map((response)=> response.data)
      );
  }

  getPerfil(username: string): Observable<IDomainUsuario> {
    return this._httpClient.get<ResponseDTO<IApiUsuario>>(`${this.API_URL}/perfil/${username}`)
    .pipe(
      map((response) => {
        const usuario = UsuarioMapper.fromApiToDomain(response.data);
        this.saveUserStorage(usuario);
        return usuario;
      })
    );
  }
}
