import { IDomainEmpleado } from '../../domain/models/empleado.model';
import { IApiEmpleado } from '../entities/empleado-api.entity';

export class EmpleadoMapper {
  static fromApiToDomain(apiEmpleado: IApiEmpleado): IDomainEmpleado {
    return {
        idEmpleado: apiEmpleado.idEmpleado,
        nombre: apiEmpleado.nombre,
        apellido: apiEmpleado.apellido,
        email: apiEmpleado.email,
        dni: apiEmpleado.dni,
        telefono: apiEmpleado.telefono,
        direccion: apiEmpleado.direccion,
        fechaContratacion: apiEmpleado.fechaContratacion,
        cargo: apiEmpleado.cargo,
        estado: apiEmpleado.estado,
        contratoDTO: apiEmpleado.contratoDTO
    }
  }
}