import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
    queryParamMap: of({
      get: () => '123'
    })
  } as unknown as ActivatedRoute;
  const fakeFireAuth = {
    currentUser: of({
      getIdTokenResult: () => new Promise((resolve, _) => {
        resolve({
          claims: {
            company: '12345678000122'
          }
        })
      })
    })
  } as unknown as AngularFireAuth
  const fakeFirestore = {
    collection: () => {
      return {valueChanges: () => of({})}
    },
    doc: () => {
      return {valueChanges: () => of({})}
    }
  } as unknown as AngularFirestore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: AngularFireAuth, useValue: fakeFireAuth},
        {provide: AngularFirestore, useValue: fakeFirestore}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
