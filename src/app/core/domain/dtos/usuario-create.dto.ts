import { UsuarioEntity } from '../entities/usuario.entity';

export interface UsuarioCreateDTO extends Omit<UsuarioEntity, 'idUsuario'>{}