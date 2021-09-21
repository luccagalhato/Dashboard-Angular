import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Filter } from '../../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private afStore: AngularFirestore) {}

  getInvoices(filter: Filter, cnpj: string): Observable<any> {
    const formattedPeriod = filter.period || moment().format('MM-YYYY');
    return this.afStore
      .collection(
        `empresas/${cnpj}/apuracoes/${formattedPeriod}/notasFiscais`,
        (ref) => {
          let query = ref.where('cnpj', '==', cnpj);
          if (filter.type) {
            query = query.where('category', '==', filter.type);
          }
          if (filter.document) {
            query = query.where('type', '==', filter.document);
          }
          return query;
        }
      )
      .valueChanges();
  }

}
