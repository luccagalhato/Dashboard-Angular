import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowTaxComponent } from './show-tax/show-tax.component';
import { TaxesComponent } from './taxes.component';

const routes: Routes = [
  { path: '', component: TaxesComponent },
  { path: ':id', component: ShowTaxComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxesRoutingModule { }
