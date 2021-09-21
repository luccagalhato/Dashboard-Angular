import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportedComponent } from './imported/imported.component';

const routes: Routes = [
  {
    path: 'importar',
    component: ImportedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxInvoicesRoutingModule {}
