import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from '../authorized.guard';
import { EmailVerifiedGuard } from '../email-verified.guard';
import { AuthComponent } from './auth/auth.component';
import { CallbackGuard } from './callback.guard';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NoAuthGuard } from './no-auth.guard';
import { PasswordRecoverComponent } from './password-recover/password-recover.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/entrar',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'entrar',
        component: SignInComponent,
        canActivate: [NoAuthGuard]
      },
      {
        path: 'recuperarSenha',
        component: PasswordRecoverComponent,
        canActivate: [NoAuthGuard]
      },
      {
        path: 'criarConta',
        component: CreateAccountComponent,
        canActivate: [NoAuthGuard]
      },
      {
        path: 'confirmarEmail',
        component: ConfirmEmailComponent,
        canActivate: [AuthorizedGuard]
      },
      {
        path: 'callback',
        component: ConfirmEmailComponent,
        canActivate: [CallbackGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
