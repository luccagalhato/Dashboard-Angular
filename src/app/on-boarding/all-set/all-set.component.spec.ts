import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { AllSetComponent } from './all-set.component';

describe('AllSetComponent', () => {
  let component: AllSetComponent;
  let fixture: ComponentFixture<AllSetComponent>;

  const fakeRouter = {
    navigate: () => null
  } as unknown as Router;
  const fakeFireAuth = {
    signOut: () => null,
    currentUser: {}
  } as unknown as AngularFireAuth
  const fakeFirestore = {
    collection: () => {
      return {add: () => {
        return {snapshot: () => {}}
      }}
    },
  } as unknown as AngularFirestore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSetComponent ],
      providers: [
        {provide: Router, useValue: fakeRouter},
        {provide: AngularFireAuth, useValue: fakeFireAuth},
        {provide: AngularFirestore, useValue: fakeFirestore}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
