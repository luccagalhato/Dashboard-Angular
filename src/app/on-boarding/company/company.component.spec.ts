import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { CompanyComponent } from './company.component';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;

  const fakeRouter = {
    navigate: () => null
  } as unknown as Router;
  const fakeFireAuth = {
    signOut: () => null,
    currentUser: new Promise((resolve, reject) => resolve({
      getIdTokenResult: () => new Promise((resolve, _) => {})
    }))
  } as unknown as AngularFireAuth
  const fakeHttpClient = {
    post: of({})
  } as unknown as HttpClient

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ CompanyComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: fakeFireAuth},
        {provide: Router, useValue: fakeRouter},
        {provide: HttpClient, useValue: fakeHttpClient}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
