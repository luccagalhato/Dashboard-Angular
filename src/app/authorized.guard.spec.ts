import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthorizedGuard } from './authorized.guard';

describe('AuthorizedGuard', () => {
  let guard: AuthorizedGuard;

  const fakeRouter = {
    navigate: () => null
  } as unknown as Router;
  const fakeFireAuth = {
    authState: of({})
  } as unknown as AngularFireAuth

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorizedGuard,
        {provide: Router, userValue: fakeRouter},
        {provide: AngularFireAuth, useValue: fakeFireAuth}
      ]
    });
    guard = new AuthorizedGuard(fakeFireAuth, fakeRouter)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
