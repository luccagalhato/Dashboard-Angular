import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingsRoutingModule } from './billings-routing.module';
import { BillingsComponent } from './billings.component';
import { BillingsGeneralComponent } from './components/billings-general/billings-general.component';
import { BillingsSubscriptionsComponent } from './components/billings-subscriptions/billings-subscriptions.component';
import { BillingsPaymentsComponent } from './components/billings-payments/billings-payments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { AvailablePlansPipe } from './components/billings-general/available-plans.pipe';

@NgModule({
  declarations: [
    BillingsComponent,
    BillingsGeneralComponent,
    BillingsSubscriptionsComponent,
    BillingsPaymentsComponent,
    AvailablePlansPipe,
  ],
  imports: [
    CommonModule,
    BillingsRoutingModule,
    FontAwesomeModule,
    TableModule,
  ],
})
export class BillingsModule {}
