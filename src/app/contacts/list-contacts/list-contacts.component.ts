import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent implements OnInit {
  contacts$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) {
    this.contacts$ = of([])
  }

  ngOnInit(): void {
    this.contacts$ = from(this.afAuth.currentUser)
    .pipe(
      switchMap((user) => {
        if (user) {
          return from(user.getIdTokenResult(false).then((token) => {
            return token.claims.company;
          }))
        } else {
          return of(null);
        }
      }),
      switchMap((cnpj) => {
        if (cnpj) {
          return this.afStore.collection(`empresas/${cnpj}/contatos`).valueChanges();
        } else {
          return of([])
        }
      })
    )
  }


}
