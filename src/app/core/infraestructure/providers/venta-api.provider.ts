import { InjectionToken, Provider } from '@angular/core';
import { IVentaApiService } from '../services/venta/venta-api.interface';
import { VentaApiService } from '../services/venta/venta.service';

export const HTTP_VENTA_SERVICE = new InjectionToken<IVentaApiService>('VentaApiService');
export const VENTA_API_PROVIDER: Provider = {provide: HTTP_VENTA_SERVICE, useClass: VentaApiService};