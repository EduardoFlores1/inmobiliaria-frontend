import { TestBed } from '@angular/core/testing';

import { ClienteRepositoryImplService } from './cliente-repository-impl.service';

describe('ClienteRepositoryImplService', () => {
  let service: ClienteRepositoryImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteRepositoryImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
