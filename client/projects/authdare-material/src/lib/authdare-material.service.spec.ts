import { TestBed } from '@angular/core/testing';

import { AuthdareMaterialService } from './authdare-material.service';

describe('AuthdareMaterialService', () => {
  let service: AuthdareMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthdareMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
