import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ConfirmEmailComponent } from './confirm-email.component';

describe('ConfirmEmailComponent', () => {
  let component: ConfirmEmailComponent;
  let fixture: ComponentFixture<ConfirmEmailComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
    queryParamMap: of({
      get: () => '123'
    })
  } as unknown as ActivatedRoute;
  const fakeRouter = {
    navigate: () => null
  } as unknown as Router;
  const fakeFireAuth = {
    currentUser: new Promise((resolve, reject) => resolve({
      email: 'user@email.com'
    }))
  } as unknown as AngularFireAuth


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ ConfirmEmailComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: fakeFireAuth},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: Router, useValue: fakeRouter}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
