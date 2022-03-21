import { TestBed } from '@angular/core/testing';

import { PasswordResetInitService } from './password-reset-init.service';

describe('PasswordResetInitService', () => {
  let service: PasswordResetInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
