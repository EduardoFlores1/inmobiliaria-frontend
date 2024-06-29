export interface IDomainCreateEmpleado {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaContratacion: string;
  cargo: string;
  estado: boolean;
}

export interface IDomainEmpleado extends IDomainCreateEmpleado{
  idEmpleado: number;
}