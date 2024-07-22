import { IDomainCliente } from './cliente.model';
import { IDomainLote } from './lote.model';
import { IDomainTipoLote } from './tipo-lote.model';
import { IDomainUsuario } from './usuario.model';

export interface IDomainCreateVenta {
  usuario: IDomainUsuario;
  cliente: IDomainCliente;
  lote: IDomainLote;
  tipoLote: IDomainTipoLote;
  fechaVenta: string;
  detalles: string;
}

export interface IDomainVenta{
  idVenta: number;
  usuario: IDomainUsuario;
  cliente: IDomainCliente;
  lote: IDomainLote;
  tipoLote: IDomainTipoLote;
  fechaVenta: string;
  detalles: string;
}