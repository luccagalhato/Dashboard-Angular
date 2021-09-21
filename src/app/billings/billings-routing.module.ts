import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingsComponent } from './billings.component';
import { BillingsGeneralComponent } from './components/billings-general/billings-general.component';
import { BillingsPaymentsComponent } from './components/billings-payments/billings-payments.component';
import { BillingsSubscriptionsComponent } from './components/billings-subscriptions/billings-subscriptions.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/contas-e-cobrancas/geral',
  },
  {
    path: '',
    component: BillingsComponent,
    children: [
      {
        path: 'geral',
        component: BillingsGeneralComponent,
      },
      {
        path: 'assinaturas',
        component: BillingsSubscriptionsComponent,
      },
      {
        path: 'pagamentos',
        component: BillingsPaymentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingsRoutingModule {}
