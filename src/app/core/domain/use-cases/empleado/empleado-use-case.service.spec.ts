import { TestBed } from '@angular/core/testing';

import { EmpleadoUseCaseService } from './empleado-use-case.service';

describe('EmpleadoUseCaseService', () => {
  let service: EmpleadoUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
