import { ContratoEntity } from '../entities/contrato.entity';

export interface ContratoCreateDTO extends Omit<ContratoEntity, 'idContrato'>{}