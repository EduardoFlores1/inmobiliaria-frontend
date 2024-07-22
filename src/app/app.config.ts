import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EMPLEADO_API_PROVIDER } from './core/infraestructure/providers/empleado-api.provider';
import { CONTRATO_API_PROVIDER } from './core/infraestructure/providers/contrato-api.provider';
import { USUARIO_API_PROVIDER } from './core/infraestructure/providers/usuario-api.provider';
import { CLIENTE_API_PROVIDER } from './core/infraestructure/providers/cliente-api.provider';
import { errorHandlerInterceptor } from './core/presentation/shared/interceptors/error-handler.interceptor';
import { tokenInterceptor } from './core/presentation/auth/interceptors/token.interceptor';
import { VENTA_API_PROVIDER } from './core/infraestructure/providers/venta-api.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(
      withInterceptors([
        tokenInterceptor,
        errorHandlerInterceptor
      ])
    ),
    // PROVIDERS
    EMPLEADO_API_PROVIDER,
    CONTRATO_API_PROVIDER,
    USUARIO_API_PROVIDER,
    CLIENTE_API_PROVIDER,
    VENTA_API_PROVIDER
  ]
};
