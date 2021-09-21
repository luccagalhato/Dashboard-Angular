import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { NoAuthGuard } from './no-auth.guard';

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;

  const fakeRouter = {
    navigate: () => null
  } as unknown as Router;
  const fakeFireAuth = {
    authState: of({})
  } as unknown as AngularFireAuth

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NoAuthGuard,
        {provide: Router, userValue: fakeRouter},
        {provide: AngularFireAuth, useValue: fakeFireAuth}
      ]
    });
    guard = new NoAuthGuard(fakeFireAuth, fakeRouter)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
