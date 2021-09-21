import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

import { ListContactsComponent } from './list-contacts.component';

describe('ListContactsComponent', () => {
  let component: ListContactsComponent;
  let fixture: ComponentFixture<ListContactsComponent>;

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
      return {valueChanges: () => of([])}
    }
  } as unknown as AngularFirestore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContactsComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: fakeFireAuth},
        {provide: AngularFirestore, useValue: fakeFirestore}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
