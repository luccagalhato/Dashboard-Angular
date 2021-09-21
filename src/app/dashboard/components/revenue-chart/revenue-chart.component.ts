import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import * as numeral from 'numeral';
import { Subscription } from 'rxjs';
import { Filter } from '../../models/filter.model';
import { Invoice } from '../../models/invoice.model';
import { Taxes } from '../../models/taxes.model';
import { TaxService } from '../../services/tax-service/tax.service';
import { ChartConfig } from './chart-config/chart-config';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss'],
})
export class RevenueChartComponent implements OnInit, AfterViewInit {
  @Input() invoices: Invoice[];
  @Input() private cnpj: string;
  @ViewChild('revenueChartCanvas') revenueChartCanvas: ElementRef;

  isLoading = true;
  filterLabel = 'Mês';
  filter = {
    period: moment().format('MM-YYYY'),
  } as Filter;
  taxes: Taxes;

  invoicesSubscription?: Subscription;
  taxCalcSubscription?: Subscription;

  chartLabels: Label[] = [];
  chartData: ChartDataSets[] = [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Receita',
      borderWidth: 5,
      borderJoinStyle: 'round',
      pointRadius: 3,
    },
    {
      data: [35, 50, 44, 61, 56, 57, 58, 65, 77, 80, 65, 47],
      label: 'Impostos',
      borderWidth: 5,
      borderJoinStyle: 'round',
      pointRadius: 3,
    },
  ];
  chartOptions: ChartOptions & { annotation?: any } = {
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
  chartColors: Color[] = [];

  constructor(private taxService: TaxService) {}

  ngOnInit() {
    for (let index = 0; index < moment().daysInMonth(); index++) {
      this.chartLabels.push(index.toString());
    }
    this.setUpChartMothly();
  }

  ngAfterViewInit() {
    this.initRevenueChart();
  }

  initRevenueChart() {
    let gradientRevenue = this.revenueChartCanvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 250);
    gradientRevenue.addColorStop(0, 'rgba(47, 76, 221, 0.3)');
    gradientRevenue.addColorStop(1, 'rgba(47, 76, 221, 0)');

    let gradientTaxes = this.revenueChartCanvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 250);
    gradientTaxes.addColorStop(0, 'rgba(181, 25, 236, 0.3)');
    gradientTaxes.addColorStop(1, 'rgba(181, 25, 236, 0)');

    this.chartColors = ChartConfig.chartColors;
    this.chartColors[0].backgroundColor = gradientRevenue;
    this.chartColors[1].backgroundColor = gradientTaxes;
  }

  onRevenueFilterChange(period: string, filterLabel: string) {
    this.filterLabel = filterLabel;
    if (period === 'mothly') {
      this.setUpChartMothly();
    } else if (period === 'quarterly') {
      this.setUpChartQuarterly();
    } else if (period === 'yearly') {
      this.setUpChartYearly();
    }
    console.log(this.filter);
  }

  setUpChartMothly() {
    this.filter.period = moment().format('MM-YYYY');
    const daysInMonth = moment().daysInMonth();
    this.chartLabels = [];
    for (let index = 1; index < daysInMonth; index++) {
      this.chartLabels.push(index.toString());
    }
    this.getTaxes();
    this.chartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.chartData[1].data = [35, 50, 44, 61, 56, 57, 58, 65, 77, 80, 65, 47, 35, 50, 44, 61, 56, 57, 58, 65, 77, 80, 65, 47, 58, 65, 77, 80, 65, 47];
  }

  setUpChartQuarterly() {
    const currentMonth = moment().format('MM');
    let currentQuarterly: number;
    if (+currentMonth >= 1 && +currentMonth <= 3) {
      currentQuarterly = 1;
      this.chartLabels = ['Jan', 'Feb', 'Mar'];
    } else if (+currentMonth >= 4 && +currentMonth <= 6) {
      currentQuarterly = 2;
      this.chartLabels = ['Apr', 'May', 'Jun'];
    } else if (+currentMonth >= 7 && +currentMonth <= 9) {
      currentQuarterly = 3;
      this.chartLabels = ['Jul', 'Aug', 'Sep'];
    } else {
      currentQuarterly = 4;
      this.chartLabels = ['Oct', 'Nov', 'Dec'];
    }
    this.filter.period = currentQuarterly + 'T-' + moment().format('YYYY');
    this.getTaxes();
    this.chartData[0].data = [0, 0, 0];
    this.chartData[1].data = [35, 50, 44];
  }

  setUpChartYearly() {
    this.filter.period = moment().format('YYYY');
    this.chartLabels = [
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
    this.getTaxes();
    this.chartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.chartData[1].data = [35, 50, 44, 61, 56, 57, 58, 65, 77, 80, 65, 47];
  }

  formatNumber(num: number, format = '0a') {
    // console.log(num);
    return numeral(num).format(format);
  }

  private getTaxes(): void {
    this.taxCalcSubscription = this.taxService
      .getTaxes(this.filter, this.cnpj)
      .subscribe(
        (taxes: Taxes) => {
          if (taxes) {
            console.log(taxes);
            this.taxes = taxes;
            this.calculateTotalTaxes();
            this.isLoading = false;
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
