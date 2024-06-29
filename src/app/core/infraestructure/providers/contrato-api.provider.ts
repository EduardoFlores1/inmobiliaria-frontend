import { InjectionToken, Provider } from '@angular/core';
import { IContratoApiService } from '../services/contrato/contrato-api.interface';
import { ContratoApiService } from '../services/contrato/contrato-api.service';

export const HTTP_CONTRATO_SERVICE = new InjectionToken<IContratoApiService>('ContratoApiService');
export const CONTRATO_API_PROVIDER: Provider = {provide: HTTP_CONTRATO_SERVICE, useClass: ContratoApiService};