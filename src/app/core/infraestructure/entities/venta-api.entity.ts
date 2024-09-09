import { IApiCliente } from './cliente-api.entity';
import { IApiLote } from './lote-api.entity';
import { IApiTipoLote } from './tipo-lote-api.entity';
import { IApiUsuario } from './usuario-api.entity';

export interface IApiCreateVenta {
  readonly usuario: IApiUsuario;
  readonly cliente: IApiCliente;
  readonly lote: IApiLote;
  readonly tipoLote: IApiTipoLote;
  readonly fechaVenta: string;
  readonly detalles: string;
}

export interface IApiVenta{
  readonly idVenta: number;
  readonly usuario: IApiUsuario;
  readonly cliente: IApiCliente;
  readonly lote: IApiLote;
  readonly tipoLote: IApiTipoLote;
  readonly fechaVenta: string;
  readonly detalles: string;
}