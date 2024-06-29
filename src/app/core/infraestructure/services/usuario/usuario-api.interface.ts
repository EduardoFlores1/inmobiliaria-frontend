import { IDomainCreateUsuario, IDomainUsuario } from '../../../domain/entities/usuario.entity';
import { ICommonApiService } from '../common-api.interface';

export interface IUsuarioApiService extends ICommonApiService<IDomainCreateUsuario, IDomainUsuario>{

}