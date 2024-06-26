import { UsuarioCreateDTO } from '../dtos/usuario-create.dto';
import { UsuarioEntity } from '../entities/usuario.entity';
import { CommonRepository } from './common.repository';

export abstract class UsuarioRepository extends CommonRepository<UsuarioEntity, UsuarioCreateDTO>{}