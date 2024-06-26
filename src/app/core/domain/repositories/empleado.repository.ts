import { EmpleadoCreateDTO } from '../dtos/empleado-create.dto';
import { EmpleadoEntity } from '../entities/empleado.entity';
import { CommonRepository } from './common.repository';

export abstract class EmpleadoRepository extends CommonRepository<EmpleadoEntity, EmpleadoCreateDTO>{}