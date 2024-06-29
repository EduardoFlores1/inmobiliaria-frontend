import { IDomainCreateEmpleado, IDomainEmpleado } from '../../../domain/entities/empleado.entity';
import { ICommonApiService } from '../common-api.interface';

export interface IEmpleadoApiService extends ICommonApiService<IDomainCreateEmpleado, IDomainEmpleado>{

}