import { TestBed } from '@angular/core/testing';

import { UsuarioRepositoryImplService } from './usuario.repository.impl.service';

describe('UsuarioRepositoryImplService', () => {
  let service: UsuarioRepositoryImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioRepositoryImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
