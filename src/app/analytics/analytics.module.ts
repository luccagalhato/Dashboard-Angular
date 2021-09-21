import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { TaxInvoicesComponent } from './components/tax-invoices/tax-invoices.component';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AnalyticsComponent, TaxInvoicesComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    ChartsModule,
    NgCircleProgressModule,
    NgbModule,
    FontAwesomeModule,
  ],
})
export class AnalyticsModule {}
