import { ClienteCreateDTO } from '../dtos/cliente-create.dto';
import { ClienteEntity } from '../entities/cliente.entity';
import { CommonRepository } from './common.repository';

export abstract class ClienteRepository extends CommonRepository<ClienteEntity, ClienteCreateDTO> {}