import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSetComponent } from './all-set/all-set.component';
import { CompanyComponent } from './company/company.component';
import { PaymentComponent } from './payment/payment.component';
import { TaxInfoComponent } from './tax-info/tax-info.component';
import { TaxInvoicesComponent } from './tax-invoices/tax-invoices.component';
import { TaxSettingsComponent } from './tax-settings/tax-settings.component';

const routes: Routes = [
  {
    path: 'empresa',
    component: CompanyComponent
  },
  {
    path: 'pagamento',
    component: PaymentComponent
  },
  {
    path: 'dados-fiscais',
    component: TaxInfoComponent
  },
  {
    path: 'notas-fiscais',
    component: TaxSettingsComponent
  },
  {
    path: 'importacao',
    component: TaxInvoicesComponent
  },
  {
    path: 'finalizado',
    component: AllSetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnBoardingRoutingModule { }
