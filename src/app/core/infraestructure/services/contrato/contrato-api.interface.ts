import { IDomainContrato, IDomainCreateContrato } from '../../../domain/entities/contrato.entity';
import { ICommonApiService } from '../common-api.interface';

export interface IContratoApiService extends ICommonApiService<IDomainCreateContrato, IDomainContrato>{

}