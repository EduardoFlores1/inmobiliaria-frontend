import { IDomainEmpleado } from '../../domain/entities/empleado.entity';
import { IApiEmpleado } from '../models/empleado-api.model';

export class EmpleadoMapper {
  static fromApiToDomain(apiEmpleado: IApiEmpleado): IDomainEmpleado {
    return {
        idEmpleado: apiEmpleado.idEmpleado,
        nombre: apiEmpleado.nombre,
        apellido: apiEmpleado.apellido,
        email: apiEmpleado.email,
        telefono: apiEmpleado.telefono,
        direccion: apiEmpleado.direccion,
        fechaContratacion: apiEmpleado.fechaContratacion,
        cargo: apiEmpleado.cargo,
        estado: apiEmpleado.estado,
    }
  }
}