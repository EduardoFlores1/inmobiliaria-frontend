export interface IApiCreateEmpleado {
  readonly nombre: string;
  readonly apellido: string;
  readonly email: string;
  readonly telefono: string;
  readonly direccion: string;
  readonly fechaContratacion: string;
  readonly cargo: string;
  readonly estado: boolean;
}

export interface IApiEmpleado extends IApiCreateEmpleado{
  readonly idEmpleado: number;
}