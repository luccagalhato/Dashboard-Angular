import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { ImportedComponent } from './imported.component';

class DumbComponent {}

xdescribe('ImportedComponent', () => {
  let component: ImportedComponent;
  let fixture: ComponentFixture<ImportedComponent>;

  const fakeFireAuth = ({
    currentUser: of({
      getIdTokenResult: () =>
        new Promise((resolve, _) => {
          resolve({
            claims: {
              company: '12345678000122',
            },
          });
        }),
    }),
  } as unknown) as AngularFireAuth;
  const fakeNgbModal = ({
    open: () => null,
  } as unknown) as NgbModal;
  const fakeNgbCalendar = ({
    getToday: () => {
      return { year: 2021, month: 3, day: 1 };
    },
  } as unknown) as NgbCalendar;
  const fakeFirestore = ({
    collection: () => {
      return { valueChanges: () => of([]) };
    },
  } as unknown) as AngularFirestore;
  const fakeActivatedRoute = ({
    snapshot: { data: {} },
    queryParamMap: of({
      get: () => '123',
    }),
  } as unknown) as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportedComponent],
      providers: [
        { provide: NgbModal, useValue: fakeNgbModal },
        { provide: NgbCalendar, useValue: fakeNgbCalendar },
        { provide: AngularFireAuth, useValue: fakeFireAuth },
        { provide: AngularFirestore, useValue: fakeFirestore },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
