import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as numeral from 'numeral';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CalculationModalComponent } from './components/calculation-modal/calculation-modal.component';
import { SimulationModalComponent } from './components/simulation-modal/simulation-modal.component';
import { TaxesService } from './taxes.service';

const DATA = new Array(15).fill(0).map((el, i) => {
  let rand = Math.floor(Math.random() * 10);
  return {
    id: Number(`${i + 1}`),
    emissionDate: '02/02/2020',
    tax: i % 2 == 0 ? 'PIS' : 'COFINS',
    rate: (Math.random() * (1 - 0 + 1) + 0).toFixed(2),
    amount: 100.45 * (i + 1),
    status: rand < 3 ? 'Delivered' : rand < 6 ? 'On Delivery' : 'New Order',
  };
});

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss'],
})
export class TaxesComponent implements OnInit {
  taxes$: Observable<any>;
  taxes: [];
  taxCalculation$: Observable<any>;
  company$: Observable<any>;
  filter$: Observable<any>;

  radioPeriod = 'month';
  radioYear = parseInt(moment().format('YYYY'));
  currentPeriod = '';

  constructor(private modalService: NgbModal, private afStore: AngularFirestore, private afAuth: AngularFireAuth,
    public taxesService: TaxesService, private route: ActivatedRoute) {}

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
  
    this.company$ = from(this.afAuth.currentUser).pipe(
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
      }),
      switchMap((cnpj) => {
        if (cnpj) {
          return this.afStore.doc(`empresas/${cnpj}`).valueChanges();
        } else {
          return null
        }
      })
    );
    this.taxCalculation$ = from(this.afAuth.currentUser).pipe(
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
      }),
      switchMap((cnpj) => {
        if (cnpj) {
          return this.afStore.doc(`empresas/${cnpj}/apuracoes/01-2021`).valueChanges();
        } else {
          return null
        }
      })
    );
    this.taxes$ = this.taxCalculation$.pipe(
      map((apuracao: any) => {
        if (apuracao) {
          return Object.entries(apuracao.impostosCalculados).map((entry) => {
            return {tax: entry[0], amount: entry[1]}
          });
        } else {
          return []
        }
      })
    );
    this.taxesService.getTaxes(this.filter$).subscribe((impostos) => {
      this.taxes = impostos;
    })
  }

  data = DATA;

  getStatusName(tax) {
    switch (tax.status) {
      case 'OPEN':
        return 'Em aberto';
      case 'CALCULATED':
        return 'Apurado';
      case 'LIQUIDED':
        return 'Pago';
      case 'SIMULATED':
        return 'Simulado';
      default:
        return '';
    }
  }

  getStatusColor(tax) {
    switch (tax.status) {
      case 'OPEN':
        return 'info';
      case 'CALCULATED':
        return 'primary';
      case 'LIQUIDED':
        return 'secondary';
      case 'SIMULATED':
        return 'dark';
      default:
        return '';
    }
  }

  openCalculation() {
    const modalRef = this.modalService.open(CalculationModalComponent, {
      windowClass: 'custom-size',
    });
    modalRef.result.then((result) => {
      if (result) {
        this.taxesService.getTaxes(this.filter$).subscribe((impostos) => {
          this.taxes = impostos;
        })
      }
    })
  }
  openSimulation() {
    const modalRef = this.modalService.open(SimulationModalComponent, {
      windowClass: 'custom-size',
    });
  }

  calculateTaxes(impostos) {
    if (impostos) {
      return Object.entries(impostos).reduce((acc, [k, v]) => acc + <number>v, 0);
    } else {
      return 0;
    }
  }

  formatPeriod(period) {
    if (period.match(/^\d{2}-\d{4}$/)) {
      return moment(period, 'MM-YYYY').format('MMMM/YYYY');
    } else if (period.match(/^\dT-\d{4}$/)) {
      return moment(period, 'QT-YYYY').format('Q trimestre/YYYY');
    } else {
      return moment(period, 'MM-YYYY').format('MMMM/YYYY');
    }
  }

  formatNumber(num: number, format = '0a') {
    // console.log(num);
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
}
