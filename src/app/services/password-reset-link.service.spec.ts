import { TestBed } from '@angular/core/testing';

import { PasswordResetLinkService } from './password-reset-link.service';

describe('PasswordResetLinkService', () => {
  let service: PasswordResetLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
