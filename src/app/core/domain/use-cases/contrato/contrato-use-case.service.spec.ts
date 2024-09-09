import { TestBed } from '@angular/core/testing';

import { ContratoUseCaseService } from './contrato-use-case.service';

describe('ContratoUseCaseService', () => {
  let service: ContratoUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
