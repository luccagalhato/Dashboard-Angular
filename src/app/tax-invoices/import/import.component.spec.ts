import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { ImportComponent } from './import.component';

describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;

  const fakeActiveModal = {
    open: () => null
  } as unknown as NgbActiveModal
  const fakeFireAuth = {
    currentUser: new Promise((resolve, _) => ({
      getIdTokenResult: () => new Promise((resolve, _) => {
        resolve({
          token: ''
        })
      })
    }))
  } as unknown as AngularFireAuth
  const fakeHttpClient = {
    post: of({})
  } as unknown as HttpClient

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportComponent ],
      providers: [
        {provide: NgbActiveModal, useValue: fakeActiveModal},
        {provide: AngularFireAuth, useValue: fakeFireAuth},
        {provide: HttpClient, useValue: fakeHttpClient},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
