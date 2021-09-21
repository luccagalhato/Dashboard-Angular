import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { NoCompanyGuard } from './no-company.guard';

describe('NoCompanyGuard', () => {
  let guard: NoCompanyGuard;

  const fakeRouter = {
    navigate: () => null
  } as unknown as Router;
  const fakeFireAuth = {
    authState: of({})
  } as unknown as AngularFireAuth

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NoCompanyGuard,
        {provide: Router, userValue: fakeRouter},
        {provide: AngularFireAuth, useValue: fakeFireAuth}
      ]
    });
    guard = new NoCompanyGuard(fakeFireAuth, fakeRouter);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
