import { TestBed } from '@angular/core/testing';

import { UsuarioUseCaseService } from './usuario-use-case.service';

describe('UsuarioUseCaseService', () => {
  let service: UsuarioUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
