import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { combineLatest, from, Observable, of } from 'rxjs';
import firebase from 'firebase';
import { catchError, filter, finalize, first, map, switchMap, take } from 'rxjs/operators';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Claims {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class TaxesService {
  currentUser$: Observable<firebase.User>
  claims$: Observable<Claims>
  cnpj$: Observable<string>;

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore,
    private route: ActivatedRoute, private http: HttpClient, private router: Router) {
      this.cnpj$ = from(this.afAuth.currentUser).pipe(
        switchMap((user) => {
          if (user) {
            return from(
              user.getIdTokenResult(false).then((token) => {
                return token.claims.company;
              })
            );
          } else {
            return of(null);
          }
        })
      );
    }
  
  getCompany() {
    return this.cnpj$.pipe(
      switchMap((cnpj) => {
        if (cnpj) {
          return this.afStore.doc(`empresas/${cnpj}`).valueChanges()
        } else {
          of(null)
        }
      })
    )
  }

  getCalculation(filter$: Observable<any>) {
    return combineLatest([filter$, this.cnpj$]).pipe(
      switchMap(([filter, cnpj]) => {
        if (cnpj) {
          return this.afStore.doc(`empresas/${cnpj}/apuracoes/${filter.period}`).valueChanges({idField: 'id'})
        } else {
          of([])
        }
      })
    )
  }

  getTaxes(filter$: Observable<any>, period = null) {
    const token$ = from(this.afAuth.currentUser)
    .pipe(
      switchMap((user) => {
        if (user) {
          return from(user.getIdTokenResult(false).then(tokenResult => tokenResult.token));
        } else {
          return null;
        }
      })
    );
    return combineLatest([filter$, token$])
    .pipe(
      switchMap(([filter, token]) => {
        const headers = {"Authorization": `Bearer ${token}`}
        return this.http.get<any>(`${environment.baseApiUrl}/taxes`, {
          params: {period: (period || filter.period)},
          headers: headers
        })
      })
    )
  }

  createTax(data = {}) {
    return from(this.afAuth.currentUser)
    .pipe(
      switchMap((user) => {
        if (user) {
          return from(user.getIdTokenResult(false).then(tokenResult => tokenResult.token));
        } else {
          return null;
        }
      }),
      switchMap((token) => {
        const headers = {"Authorization": `Bearer ${token}`}
        return this.http.post<any>(`${environment.baseApiUrl}/taxes`, data,
          {
            headers: headers
          }
        )
      })
    )
  }
}
