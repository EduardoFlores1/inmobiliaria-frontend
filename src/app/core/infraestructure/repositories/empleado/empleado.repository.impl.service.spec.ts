import { TestBed } from '@angular/core/testing';

import { EmpleadoRepositoryImplService } from './empleado.repository.impl.service';

describe('EmpleadoRepositoryImplService', () => {
  let service: EmpleadoRepositoryImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoRepositoryImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
