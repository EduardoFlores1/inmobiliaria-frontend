import { IDomainCliente, IDomainCreateCliente } from '../../../domain/models/cliente.model';
import { ICommonApiService } from '../common-api.interface';

export interface IClienteApiService extends ICommonApiService<IDomainCreateCliente, IDomainCliente>{

}