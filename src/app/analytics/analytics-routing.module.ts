import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { TaxInvoicesComponent } from './components/tax-invoices/tax-invoices.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/analise/notas-fiscais' },
  {
    path: '',
    component: AnalyticsComponent,
    children: [
      {
        path: 'notas-fiscais',
        component: TaxInvoicesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
