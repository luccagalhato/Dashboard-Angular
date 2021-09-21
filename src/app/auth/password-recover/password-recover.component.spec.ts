import 'zone.js/dist/zone-testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';

import { PasswordRecoverComponent } from './password-recover.component';
import { of } from 'rxjs';

describe('PasswordRecoverComponent', () => {
  let component: PasswordRecoverComponent;
  let fixture: ComponentFixture<PasswordRecoverComponent>;
  
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
    verifyPasswordResetCode: () => null,
    sendPasswordResetEmail: () => null,
    confirmPasswordReset: () => null,
  } as unknown as AngularFireAuth

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ PasswordRecoverComponent ],
      providers: [ FormBuilder, SystemService,
        {provide: AngularFireAuth, useValue: fakeFireAuth},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: Router, useValue: fakeRouter}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
