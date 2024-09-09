import { TestBed } from '@angular/core/testing';

import { VentaUseCaseService } from './venta-use-case.service';

describe('VentaUseCaseService', () => {
  let service: VentaUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
