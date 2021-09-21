import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of, combineLatest, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import * as numeral from 'numeral';
import { TableShowComponent } from 'src/app/tax-invoices/components/table-show/table-show.component';
import { ImportComponent } from '../import/import.component';

@Component({
  selector: 'app-imported',
  templateUrl: './imported.component.html',
  styleUrls: ['./imported.component.scss'],
})
export class ImportedComponent implements OnInit {
  @ViewChild('monthCollapse') monthCollapse: ElementRef;
  @ViewChild('quarterCollapse') quarterCollapse: ElementRef;

  faIcon = faEdit;
  taxInvoicesCount = 0;
  total = 0;
  totalTaxes = 0;
  contactsCount = 0;
  taxes = {
    pis: 0,
    cofins: 0,
    irpj: 0,
    csll: 0,
    iss: 0,
    icms: 0,
    cpp: 0,
  };
  invoices$: Observable<any>;
  filter$: Observable<any>;
  invoicesSubscription?: Subscription;
  taxCalcSubscription?: Subscription;

  rows: any[] = [];

  radioPeriod = 'month';
  radioYear = parseInt(moment().format('YYYY'));
  currentPeriod = '';

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private modal: NgbModal
  ) {
    this.filter$ = of({
      type: null,
      period: moment().format('MM-YYYY'),
      document: null,
    });
    this.invoices$ = of([]);
  }

  ngOnInit(): void {
    this.filter$ = this.route.queryParamMap.pipe(
      map((params) => {
        this.currentPeriod = params.get('period');
        return {
          type: params.get('type'),
          period: params.get('period') || moment().format('MM-YYYY'),
          document: params.get('document'),
        };
      })
    );
    const cnpj$ = from(this.afAuth.currentUser).pipe(
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

    this.invoices$ = combineLatest([this.filter$, cnpj$]).pipe(
      switchMap(([filter, cnpj]) => {
        if (cnpj) {
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
        } else {
          return of([]);
        }
      })
    );

    this.taxCalcSubscription = combineLatest([this.filter$, cnpj$])
      .pipe(
        switchMap(([filter, cnpj]) => {
          if (cnpj) {
            const formattedPeriod = filter.period || moment().format('MM-YYYY');
            return this.afStore
              .doc(`empresas/${cnpj}/apuracoes/${formattedPeriod}`)
              .valueChanges();
          } else {
            return of(null);
          }
        })
      )
      .subscribe((taxDoc: any) => {
        if (taxDoc) {
          this.taxes = {
            pis: taxDoc.impostosCalculados?.PIS || 0,
            cofins: taxDoc.impostosCalculados?.COFINS || 0,
            irpj: taxDoc.impostosCalculados?.IRPJ || 0,
            csll: taxDoc.impostosCalculados?.CSLL || 0,
            iss: taxDoc.impostosCalculados?.ISS || 0,
            icms: taxDoc.impostosCalculados?.ICMS || 0,
            cpp: taxDoc.impostosCalculados?.CPP || 0,
          };
          console.log(this.taxes);
          this.totalTaxes = Object.values(this.taxes).reduce(
            (acc, v) => acc + v,
            0
          );
          console.log(this.totalTaxes);
          this.total = taxDoc.total;
          this.contactsCount = taxDoc.contactsCount || 0;
        }
      });

    this.invoicesSubscription = this.invoices$.subscribe((invoices) => {
      //this.total = invoices.reduce((acc: number, invoice: any) => acc + parseFloat(invoice.total), 0);
      this.taxInvoicesCount = invoices.length;
    });
  }

  ngOnDestroy() {
    this.invoicesSubscription?.unsubscribe();
    this.taxCalcSubscription?.unsubscribe();
  }

  formatNumber(num: number, format = '0a') {
    return numeral(num).format(format);
  }

  formatDate(date, format = null) {
    if (!format && date.match(/^\d{2}-\d{4}$/)) {
      return moment(date, 'MM-YYYY').format('MMM/YYYY');
    } else if (!format && date.match(/^\dT-\d{4}$/)) {
      return moment(date, 'QT-YYYY').format('Qtri/YYYY');
    } else {
      return moment(date).format(format);
    }
  }

  months() {
    return Array(12)
      .fill(0)
      .map((v, index) => {
        if (index < 9) {
          return moment(`${this.radioYear}-0${index + 1}-01`);
        } else {
          return moment(`${this.radioYear}-${index + 1}-01`);
        }
      });
  }

  quarters() {
    return Array(4)
      .fill(0)
      .map((v, index) => {
        if ((index + 1) * 3 < 10) {
          return `${this.radioYear}-0${(index + 1) * 3}-01`;
        } else {
          return `${this.radioYear}-${(index + 1) * 3}-01`;
        }
      });
  }

  isMonthSelected(month) {
    return this.currentPeriod === moment(month).format('MM-YYYY');
  }

  isQuarterSelected(quarter) {
    return this.currentPeriod === moment(quarter).format('QT-YYYY');
  }

  decrementYear() {
    this.radioYear -= 1;
  }
  incrementYear() {
    this.radioYear += 1;
  }

  importNf() {
    this.modal.open(ImportComponent);
  }

  openRowDetails() {
    this.modal.open(TableShowComponent, { size: 'xl' });
  }
}
