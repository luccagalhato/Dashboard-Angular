import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ChartsModule } from 'ng2-charts';
import { NgxMaskModule } from 'ngx-mask';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';

@NgModule({
  declarations: [DashboardComponent, RevenueChartComponent],
  imports: [
    NgxShimmerLoadingModule,
    ChartsModule,
    CommonModule,
    NgbModule,
    NgCircleProgressModule.forRoot(),
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
