export interface IApiLote{
  readonly idLote: number;
  readonly manzana: string;
  readonly precio: number;
  readonly fechaIngreso: string;
  readonly tipoEstado: string;
  readonly estado: boolean;
}