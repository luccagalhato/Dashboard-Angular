import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { CallbackGuard } from './callback.guard';

describe('CallbackGuard', () => {
  let guard: CallbackGuard;

  const fakeRouter = {
    queryParamMap: of({
      get: () => '123'
    }),
    navigate: () => null
  } as unknown as Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, userValue: fakeRouter}
      ]
    });
    guard = new CallbackGuard(fakeRouter)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
