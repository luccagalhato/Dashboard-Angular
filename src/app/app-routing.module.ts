import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedLayoutComponent } from './authorized-layout/authorized-layout.component';
import { AuthorizedGuard } from './authorized.guard';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';

import { EmailVerifiedGuard } from './email-verified.guard';
import { NoCompanyGuard } from './no-company.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    path: '',
    component: AuthorizedLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
    canActivate: [AuthorizedGuard, EmailVerifiedGuard, NoCompanyGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./on-boarding/on-boarding.module').then(
        (m) => m.OnBoardingModule
      ),
    canActivate: [AuthorizedGuard, EmailVerifiedGuard],
  },
  {
    path: 'contatos',
    component: AuthorizedLayoutComponent,
    loadChildren: () =>
      import('./contacts/contacts.module').then((m) => m.ContactsModule),
    canActivate: [AuthorizedGuard, EmailVerifiedGuard, NoCompanyGuard],
  },
  {
    path: 'notasFiscais',
    component: AuthorizedLayoutComponent,
    loadChildren: () =>
      import('./tax-invoices/tax-invoices.module').then(
        (m) => m.TaxInvoicesModule
      ),
    canActivate: [AuthorizedGuard, EmailVerifiedGuard, NoCompanyGuard],
  },
  {
    path: 'documentos',
    component: AuthorizedLayoutComponent,
    loadChildren: () =>
      import('./documents/documents.module').then((m) => m.DocumentsModule),
    canActivate: [AuthorizedGuard, EmailVerifiedGuard, NoCompanyGuard],
  },
  {
    path: 'impostos',
    component: AuthorizedLayoutComponent,
    loadChildren: () =>
      import('./taxes/taxes.module').then((m) => m.TaxesModule),
    canActivate: [AuthorizedGuard, EmailVerifiedGuard, NoCompanyGuard],
  },
  {
    path: 'configuracoes',
    component: AuthorizedLayoutComponent,
    loadChildren: () =>
      import('./configs/configs.module').then((m) => m.ConfigsModule),
  },
  {
    path: 'perfil',
    component: AuthorizedLayoutComponent,
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'contas-e-cobrancas',
    component: AuthorizedLayoutComponent,
    loadChildren: () =>
      import('./billings/billings.module').then((m) => m.BillingsModule),
  },
  {
    component: AuthorizedLayoutComponent,
    path: 'analise',
    loadChildren: () =>
      import('./analytics/analytics.module').then((m) => m.AnalyticsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
