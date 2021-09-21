import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { combineLatest, from, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as moment from 'moment';
import * as numeral from 'numeral';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { Taxes } from '../../models/taxes.model';
import { Filter } from '../../models/filter.model';
import { Invoice } from '../../models/invoice.model';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { TaxService } from '../../services/tax-service/tax.service';

export interface Query {
  title: string;
  desc: string;
  date: string;
  time: string;
  checkStatus: boolean;
  attachmentStatus: 'success' | 'error' | 'pending';
  statusLabel: string;
}

export interface Bill {
  title: string;
  date: string;
  desc: string;
  iconPath: string;
  amount: number;
  tagClass: 'tag-success' | 'tag-blue' | 'tag-purple' | 'tag-danger';
  tagText: string;
}

const QUERIES: Query[] = [
  {
    title: 'Ficha CNPJ',
    desc: 'Receita Federal',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: true,
    statusLabel: 'ativo',
    attachmentStatus: 'success',
  },
  {
    title: 'Ficha CNPJ',
    desc: 'Receita Federal',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: true,
    statusLabel: 'ativo',
    attachmentStatus: 'success',
  },
  {
    title: 'Ficha CNPJ',
    desc: 'Receita Federal',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: true,
    statusLabel: 'ativo',
    attachmentStatus: 'success',
  },
  {
    title: 'Ficha CNPJ',
    desc: 'Receita Federal',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: true,
    statusLabel: 'ativo',
    attachmentStatus: 'success',
  },
  {
    title: 'Ficha CNPJ',
    desc: 'Receita Federal',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: true,
    statusLabel: 'ativo',
    attachmentStatus: 'success',
  },
  {
    title: 'Ficha CNPJ',
    desc: 'Receita Federal',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: true,
    statusLabel: 'ativo',
    attachmentStatus: 'success',
  },
  {
    title: 'Ficha CNPJ',
    desc: 'Receita Federal',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: true,
    statusLabel: 'ativo',
    attachmentStatus: 'success',
  },
  {
    title: 'Ficha CNPJ',
    desc: 'Receita Federal',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: true,
    statusLabel: 'ativo',
    attachmentStatus: 'success',
  },
  {
    title: 'Regime Tributário',
    desc: 'feito em 04/06/20',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: true,
    statusLabel: 'SIMPLES Nacional',
    attachmentStatus: 'success',
  },
  {
    title: 'Sintegra',
    desc: 'Estado',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: true,
    statusLabel: 'não habilitado',
    attachmentStatus: 'error',
  },
  {
    title: 'Certidão Negativa',
    desc: 'Receita Federal e PGFN',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: true,
    statusLabel: 'consultada',
    attachmentStatus: 'success',
  },
  {
    title: 'Certidão Negativa',
    desc: 'Estado / GO',
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('h:mm:ss A'),
    checkStatus: false,
    statusLabel: 'pendente',
    attachmentStatus: 'pending',
  },
];

const BILLS: Bill[] = [
  {
    title: 'Guia - Simples Nacional',
    date: moment().format('LL'),
    desc: 'Impostos (11%) | R$ 14.000',
    iconPath: '../../assets/icons/ic_sign.svg',
    amount: 14000,
    tagClass: 'tag-danger',
    tagText: 'em atraso',
  },
  {
    title: 'Taxa - Funcionamento',
    date: moment().format('LL'),
    desc: 'Ano 2021 | Prefeitura de Goiânia',
    iconPath: '../../assets/icons/ic_flag.svg',
    amount: 250,
    tagClass: 'tag-success',
    tagText: 'pago',
  },
  {
    title: 'Guia - Simples Nacional',
    date: moment().format('LL'),
    desc: 'Impostos (11%) | R$ 14.000',
    iconPath: '../../assets/icons/ic_sign.svg',
    amount: 14000,
    tagClass: 'tag-danger',
    tagText: 'em atraso',
  },
  {
    title: 'Taxa - Funcionamento',
    date: moment().format('LL'),
    desc: 'Ano 2021 | Prefeitura de Goiânia',
    iconPath: '../../assets/icons/ic_flag.svg',
    amount: 250,
    tagClass: 'tag-success',
    tagText: 'pago',
  },
  {
    title: 'Guia - Simples Nacional',
    date: moment().format('LL'),
    desc: 'Impostos (11%) | R$ 14.000',
    iconPath: '../../assets/icons/ic_sign.svg',
    amount: 14000,
    tagClass: 'tag-blue',
    tagText: 'lorem',
  },
  {
    title: 'Taxa - Funcionamento',
    date: moment().format('LL'),
    desc: 'Ano 2021 | Prefeitura de Goiânia',
    iconPath: '../../assets/icons/ic_flag.svg',
    amount: 250,
    tagClass: 'tag-purple',
    tagText: 'lorem',
  },
  {
    title: 'Guia - Simples Nacional',
    date: moment().format('LL'),
    desc: 'Impostos (11%) | R$ 14.000',
    iconPath: '../../assets/icons/ic_sign.svg',
    amount: 14000,
    tagClass: 'tag-danger',
    tagText: 'em atraso',
  },
  {
    title: 'Taxa - Funcionamento',
    date: moment().format('LL'),
    desc: 'Ano 2021 | Prefeitura de Goiânia',
    iconPath: '../../assets/icons/ic_flag.svg',
    amount: 250,
    tagClass: 'tag-success',
    tagText: 'pago',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  faIcon = faEdit;

  invoices$: Observable<any>;
  filter$: Observable<any>;
  total: number = 0;
  taxInvoicesCount: number = 0;
  totalTaxes = 0;
  contactsCount = 0;
  taxes: Taxes;
  filterSubscription?: Subscription;
  invoicesSubscription?: Subscription;
  taxCalcSubscription?: Subscription;

  fakeNfSummaryStats = [40, 80, 23];
  fakeNfSummaryTotal = this.fakeNfSummaryStats.reduce((a, b) => a + b, 0);

  nfSummaryActiveFiler: number = 2;
  public nfSummaryChartLabels: Label[] = [
    'Emitidas',
    'Recebidas',
    'Canceladas',
  ];
  public nfSummaryChartData: MultiDataSet = [[...this.fakeNfSummaryStats]];
  public nfSummaryChartType: ChartType = 'doughnut';
  public nfSummaryChartColors: Color[] = [
    { backgroundColor: ['#2BC155', '#FF6D4C', '#3E4954'] },
  ];
  public nfSummaryChartOptions: ChartOptions = {
    legend: {
      display: false,
    },
  };
  selectedEntradasFilter: string = 'Entrada';
  selectedSaidaFilter: string = 'Saida';
  selectedGeralFilter: string = 'Todas';

  // filters
  selectedRevenueFilter: string = 'Mês';
  selectedTaxesFilter: string = 'Mensal';
  selectedBillsFilter: string = 'Mensal';

  
  queries: Query[] = QUERIES;
  bills: Bill[] = BILLS;
  generalFilter = {} as Filter;
  private cnpj: string;

  //---------------------------------------------------------

  invoices: Invoice[];
  isLoading = true;
  revenueFilter = {
    period: moment().format('MM-YYYY'),
  } as Filter;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private invoiceService: InvoiceService,
    private taxService: TaxService,
    private spinner: NgxSpinnerService
  ) {
    this.filter$ = of({
      type: null,
      period: null,
      category: null,
    });
    this.invoices$ = of([]);
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getCurrentCnpj();
  }

  ngOnDestroy() {
    this.invoicesSubscription?.unsubscribe();
    this.taxCalcSubscription?.unsubscribe();
    this.filterSubscription?.unsubscribe();
  }

  formatNumber(num: number, format = '0a') {
    // console.log(num);
    return numeral(num).format(format);
  }

  setRevenueFilter(filter) {
    this.selectedRevenueFilter = filter;
  }
  setTaxesFilter(filter) {
    this.selectedTaxesFilter = filter;
    if (filter === 'monthly') {
    } else if (filter === 'semester') {
    } else if (filter === 'yearly') {
    }
  }
  setBillsFilter(filter) {
    this.selectedBillsFilter = filter;
  }

  //---------------------------

  onTypeFilterChange(type: string) {
    this.generalFilter.type = type;
    this.getInvoices();
    console.log(this.generalFilter);
  }

  onDocumentFilterChange(document: string) {
    this.generalFilter.document = document;
    this.getInvoices();
    console.log(this.generalFilter);
  }

  

  private getCurrentCnpj() {
    from(this.afAuth.currentUser)
      .pipe(
        switchMap((user) => {
          if (user) {
            return from(
              user.getIdTokenResult(false).then((token) => {
                return token.claims.company;
              })
            );
          } else {
            return of(Error('Usuário não encontrado'));
          }
        })
      )
      .subscribe(
        (cnpj) => {
          console.log(cnpj);
          this.cnpj = cnpj;
          this.getInvoices();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private getInvoices(): void {
    try {
      this.invoicesSubscription = this.invoiceService
        .getInvoices(this.generalFilter, this.cnpj)
        .subscribe(
          (invoices: Invoice[]) => {
            this.invoices = invoices;
            console.log(this.invoices);
            this.getTaxes();
          },
          (error) => {
            console.error(error);
          }
        );
    } catch(err) {
      console.log(err);
    }
  }

  private getTaxes(): void {
    this.taxCalcSubscription = this.taxService
      .getTaxes(this.revenueFilter, this.cnpj)
      .subscribe(
        (taxes: Taxes) => {
          console.log(taxes);
          if (taxes) {
            this.taxes = taxes;
            this.calculateTotalTaxes();
            this.isLoading = false;
            this.spinner.hide();
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  private calculateTotalTaxes(): void {
    this.taxes.totalTaxes =
      this.taxes.impostosCalculados.PIS +
      this.taxes.impostosCalculados.COFINS +
      this.taxes.impostosCalculados.IRPJ +
      this.taxes.impostosCalculados.CSLL +
      this.taxes.impostosCalculados.ISS +
      this.taxes.impostosRetidos.ICMS +
      this.taxes.impostosCalculados.CPP;
  }
}
