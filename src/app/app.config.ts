import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { EMPLEADO_API_PROVIDER } from './core/infraestructure/providers/empleado-api.provider';
import { CONTRATO_API_PROVIDER } from './core/infraestructure/providers/contrato-api.provider';
import { USUARIO_API_PROVIDER } from './core/infraestructure/providers/usuario-api.provider';
import { CLIENTE_API_PROVIDER } from './core/infraestructure/providers/cliente-api.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(),
    // PROVIDERS
    EMPLEADO_API_PROVIDER,
    CONTRATO_API_PROVIDER,
    USUARIO_API_PROVIDER,
    CLIENTE_API_PROVIDER
  ]
};
