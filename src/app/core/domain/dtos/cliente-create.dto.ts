import { ClienteEntity } from '../entities/cliente.entity';

export interface ClienteCreateDTO extends Omit<ClienteEntity, 'idCliente'>{}