import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { TaxInvoicesComponent } from './tax-invoices.component';

xdescribe('TaxInvoicesComponent', () => {
  let component: TaxInvoicesComponent;
  let fixture: ComponentFixture<TaxInvoicesComponent>;

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
      declarations: [ TaxInvoicesComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: fakeFireAuth},
        {provide: Router, useValue: fakeRouter},
        {provide: HttpClient, useValue: fakeHttpClient}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
