import { ContratoCreateDTO } from '../dtos/contrato-create.dto';
import { ContratoEntity } from '../entities/contrato.entity';
import { CommonRepository } from './common.repository';

export abstract class ContratoRepository extends CommonRepository<ContratoEntity, ContratoCreateDTO> {}