import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxesComponent } from './taxes/taxes.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { CompanyComponent } from './company/company.component';
import { DocumentsComponent } from './documents/documents.component';
import { FeesComponent } from './fees/fees.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/documentos/empresa',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DocumentsComponent,
    children: [
      {
        path: 'empresa',
        component: CompanyComponent
      },
      {
        path: 'impostos',
        component: TaxesComponent
      },
      {
        path: 'taxas',
        component: FeesComponent
      },
      {
        path: 'certidoes',
        component: CertificatesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
