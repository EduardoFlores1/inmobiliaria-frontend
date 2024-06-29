import { TestBed } from '@angular/core/testing';

import { ClienteUseCaseService } from './cliente-use-case.service';

describe('ClienteUseCaseService', () => {
  let service: ClienteUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
