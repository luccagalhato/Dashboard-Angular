import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { AuthorizedLayoutComponent } from './authorized-layout.component';

export class DumbComponent {}

describe('AuthorizedLayoutComponent', () => {
  let component: AuthorizedLayoutComponent;
  let fixture: ComponentFixture<AuthorizedLayoutComponent>;

  const fakeActivatedRoute = ({
    snapshot: { data: {} },
    queryParamMap: of({
      get: () => '123',
    }),
  } as unknown) as ActivatedRoute;
  const fakeFireAuth = ({
    currentUser: new Promise((resolve, _) =>
      resolve({
        getIdTokenResult: () =>
          new Promise((resolve, _) => {
            resolve({});
          }),
        signOut: () => null,
      })
    ),
  } as unknown) as AngularFireAuth;
  const fakeFirestore = ({
    collection: () => {
      return {
        add: () => {
          return { snapshot: () => {} };
        },
      };
    },
  } as unknown) as AngularFirestore;
  const fakeRouter = ({
    navigate: () => null,
    url: '',
  } as unknown) as Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule, FontAwesomeModule],
      declarations: [AuthorizedLayoutComponent],
      providers: [
        { provide: AngularFireAuth, useValue: fakeFireAuth },
        { provide: AngularFirestore, useValue: fakeFirestore },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
