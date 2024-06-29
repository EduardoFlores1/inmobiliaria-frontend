import { InjectionToken, Provider } from '@angular/core';
import { IClienteApiService } from '../services/cliente/cliente-api.interface';
import { ClienteApiService } from '../services/cliente/cliente-api.service';

export const HTTP_CLIENTE_SERVICE = new InjectionToken<IClienteApiService>('ClienteApiService');
export const CLIENTE_API_PROVIDER: Provider = {provide: HTTP_CLIENTE_SERVICE, useClass: ClienteApiService};