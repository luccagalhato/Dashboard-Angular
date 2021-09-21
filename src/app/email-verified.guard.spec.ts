import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { EmailVerifiedGuard } from './email-verified.guard';

describe('EmailVerifiedGuard', () => {
  let guard: EmailVerifiedGuard;

  const fakeRouter = {
    navigate: () => null
  } as unknown as Router;
  const fakeFireAuth = {
    authState: of({})
  } as unknown as AngularFireAuth

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmailVerifiedGuard,
        {provide: Router, userValue: fakeRouter},
        {provide: AngularFireAuth, useValue: fakeFireAuth}
      ]
    });
    guard = new EmailVerifiedGuard(fakeFireAuth, fakeRouter);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
