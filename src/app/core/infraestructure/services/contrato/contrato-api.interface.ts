import { IDomainContrato, IDomainCreateContrato } from '../../../domain/models/contrato.model';
import { ICommonApiService } from '../common-api.interface';

export interface IContratoApiService extends ICommonApiService<IDomainCreateContrato, IDomainContrato>{

}