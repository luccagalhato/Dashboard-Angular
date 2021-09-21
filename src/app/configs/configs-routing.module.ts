import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { CompanyComponent } from './components/company/company.component';
import { FiscalComponent } from './components/fiscal/fiscal.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ConfigsComponent } from './configs.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/configuracoes/empresa',
  },
  {
    path: '',
    component: ConfigsComponent,
    children: [
      {
        path: 'empresa',
        component: CompanyComponent,
      },
      {
        path: 'socios',
        component: PartnersComponent,
      },
      {
        path: 'fiscal',
        component: FiscalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigsRoutingModule {}
