import { IDomainCreateUsuario, IDomainUsuario } from '../../../domain/models/usuario.model';
import { ICommonApiService } from '../common-api.interface';

export interface IUsuarioApiService extends ICommonApiService<IDomainCreateUsuario, IDomainUsuario>{

}