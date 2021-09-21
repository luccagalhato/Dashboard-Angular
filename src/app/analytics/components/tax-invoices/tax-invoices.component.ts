import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { faChevronDown, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

export const CUSTOMERS = Array.from({ length: 5 }, () => ({
  name: 'Cliente ABC',
  cnpj: '27.004.418/0001-23',
  total: Math.floor(Math.random() * 10000) + 1000,
  sales: Math.floor(Math.random() * 100) + 1,
  variation: (Math.random() - 0.5) * 2,
}));

export const SUPPLIERS = Array.from({ length: 5 }, () => ({
  name: 'Fornecedor YXZ',
  cnpj: '27.004.418/0001-23',
  total: Math.floor(Math.random() * 10000) + 1000,
  sales: Math.floor(Math.random() * 100) + 1,
  variation: (Math.random() - 0.5) * 2,
}));

export const CFOP_INVOICES = Array.from({ length: 5 }, () => ({
  title: '5.102 - Vendas de mercadorias de terceiros',
  quantity: Math.floor(Math.random() * 100) + 1,
  amount: Math.floor(Math.random() * 10000) + 1000,
}));

@Component({
  selector: 'app-tax-invoices',
  templateUrl: './tax-invoices.component.html',
  styleUrls: ['./tax-invoices.component.scss'],
})
export class TaxInvoicesComponent implements OnInit {
  faChevronDown = faChevronDown;
  faEllipsisH = faEllipsisH;
  @ViewChild('invoicesChart') invoicesChart;

  public lineChartData: ChartDataSets[] = [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 65, 59],
      label: 'Notas',
      borderWidth: 5,
      borderJoinStyle: 'round',
      pointRadius: 3,
    },
  ];
  public lineChartLabels: Label[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  public lineChartOptions: ChartOptions & { annotation?: any } = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      xAxes: [
        {
          ticks: {
            fontFamily: 'Poppins',
          },
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontFamily: 'Poppins',
            stepSize: 20,
            beginAtZero: true,
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  fakeNfSummaryStats = [40, 80, 23];
  fakeNfSummaryTotal = this.fakeNfSummaryStats.reduce((a, b) => a + b, 0);
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

  selectedCustomersSuppliersFilter: string = 'Clientes';

  customers = CUSTOMERS;
  suppliers = SUPPLIERS;
  cfopInvoices = CFOP_INVOICES;
  cfopFilter = 0;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initRevenueChart();
    this.cdRef.detectChanges();
  }

  initRevenueChart() {
    let gradientRevenue = this.invoicesChart.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 250);
    gradientRevenue.addColorStop(0, 'rgba(47, 76, 221, 0.75)');
    gradientRevenue.addColorStop(1, 'rgba(255, 255,255, 0)');

    this.lineChartColors = [
      {
        borderColor: 'rgba(47, 76, 221, 1)',
        backgroundColor: gradientRevenue,
        borderWidth: 4,
        pointBorderColor: 'rgba(47, 76, 221, .5)',
        pointBackgroundColor: 'rgba(47, 76, 221, .5)',
      },
    ];
  }
}
