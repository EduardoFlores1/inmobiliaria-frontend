import { TestBed } from '@angular/core/testing';

import { ContratoRepositoryImplService } from './contrato.repository.impl.service';

describe('ContratoRepositoryImplService', () => {
  let service: ContratoRepositoryImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoRepositoryImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
