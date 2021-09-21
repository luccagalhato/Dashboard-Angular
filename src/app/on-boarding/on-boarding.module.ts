import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OnBoardingRoutingModule } from './on-boarding-routing.module';
import { CompanyComponent } from './company/company.component';
import { TaxInvoicesComponent } from './tax-invoices/tax-invoices.component';
import { AllSetComponent } from './all-set/all-set.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { PaymentComponent } from './payment/payment.component';
import { TaxInfoComponent } from './tax-info/tax-info.component';
import { TaxSettingsComponent } from './tax-settings/tax-settings.component';

@NgModule({
  declarations: [CompanyComponent, TaxInvoicesComponent, AllSetComponent, PaymentComponent, TaxInfoComponent, TaxSettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OnBoardingRoutingModule,
    FontAwesomeModule,
    NgxMaskModule.forChild(),
    HttpClientModule
  ]
})
export class OnBoardingModule { }
