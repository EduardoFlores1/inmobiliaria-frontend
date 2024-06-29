import { IDomainCliente, IDomainCreateCliente } from '../../../domain/entities/cliente.entity';
import { ICommonApiService } from '../common-api.interface';

export interface IClienteApiService extends ICommonApiService<IDomainCreateCliente, IDomainCliente>{

}