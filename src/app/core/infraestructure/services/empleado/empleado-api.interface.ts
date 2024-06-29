import { IDomainCreateEmpleado, IDomainEmpleado } from '../../../domain/models/empleado.model';
import { ICommonApiService } from '../common-api.interface';

export interface IEmpleadoApiService extends ICommonApiService<IDomainCreateEmpleado, IDomainEmpleado>{

}