import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Filter } from '../../models/filter.model';

@Injectable({ providedIn: 'root' })
export class TaxService {
  constructor(private afStore: AngularFirestore) {}

  getTaxes(filter: Filter, cnpj: string): Observable<any> {
    return this.afStore
      .doc(`empresas/${cnpj}/apuracoes/${filter.period}`)
      .valueChanges();
  }
}
