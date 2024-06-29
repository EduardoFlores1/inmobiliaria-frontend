import { EmpleadoApiService } from '../services/empleado/empleado-api.service';
import { IEmpleadoApiService } from './../services/empleado/empleado-api.interface';
import { InjectionToken, Provider } from '@angular/core';

export const HTTP_EMPLEADO_SERVICE = new InjectionToken<IEmpleadoApiService>('EmpleadoApiService');
export const EMPLEADO_API_PROVIDER: Provider = {provide: HTTP_EMPLEADO_SERVICE, useClass: EmpleadoApiService};