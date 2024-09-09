import { InjectionToken, Provider } from '@angular/core';
import { IUsuarioApiService } from '../services/usuario/usuario-api.interface';
import { UsuarioApiService } from '../services/usuario/usuario-api.service';

export const HTTP_USUARIO_SERVICE = new InjectionToken<IUsuarioApiService>('UsuarioApiService');
export const USUARIO_API_PROVIDER: Provider = {provide: HTTP_USUARIO_SERVICE, useClass: UsuarioApiService};