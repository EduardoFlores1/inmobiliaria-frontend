import { EmpleadoEntity } from '../entities/empleado.entity';

export interface EmpleadoCreateDTO extends Omit<EmpleadoEntity, 'idEmpleado'>{}