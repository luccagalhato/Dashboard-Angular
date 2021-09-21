import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SystemService } from 'src/app/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.scss']
})
export class PasswordRecoverComponent implements OnInit {
  form: FormGroup;
  resetForm: FormGroup;
  submitted = false;
  loading = false;
  sent = false;
  mode: string | null = null;
  oobCode: string | null = null;
  apiKey: string | null = null;
  email = '';

  confirm = false;

  constructor(private fb: FormBuilder, private sys: SystemService,
    private afAuth: AngularFireAuth, private route: ActivatedRoute,
    private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required]
    })
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(take(1)).toPromise().then((params) => {
      this.mode = params.get('mode');
      this.oobCode = params.get('oobCode');
      this.apiKey = params.get('apiKey');

      if (this.mode === 'resetPassword') {
        this.afAuth.verifyPasswordResetCode(this.oobCode ?? '')
        .then((email) => {
          this.email = email;
          this.confirm = true;
        })
        .catch((err) => {
          let msg = 'Não foi possível recuperar a senha.'
          if (err && err.code) {
            switch (err.code) {
              case 'auth/expired-action-code':
                msg = 'Link expirado. Tente recuperar novamente.'
                break;
              case 'auth/invalid-action-code':
                msg = 'Link inválido. Tente recuperar novamente.'
                break;
              case 'auth/user-disabled':
                msg = 'Usuário desabilitado. Entre em contato conosco.'
                break;
              case 'auth/user-not-found':
                msg = 'Usuário não encontrado.'
                break;
            }
          }
          this.sys.showToast(msg, { classname: 'bg-danger text-light', delay: 4000 })
       });
      }
    })
  }

  async sendPasswordResetLink(event: any) {
    event.preventDefault();
    this.loading = true;
    await this.afAuth.sendPasswordResetEmail(this.form.value.email, {
      url: `${environment.domain}/auth/recuperarSenha`
    })
    .then((_) => {
      this.sent = true;
      this.sys.showToast('Link enviado com sucesso! Verifique sua caixa de entrada', { classname: 'bg-success text-light', delay: 4000 })  
    })
    .catch((e) => {
      this.sys.showToast('Não foi possível enviar o email', { classname: 'bg-danger text-light', delay: 4000 })
    });
    this.loading = false;
  }

  async resetPassword(event: any) {
    event.preventDefault();
    this.loading = true;
    await this.afAuth.confirmPasswordReset(this.oobCode ?? '', this.resetForm.value.password)
    .then(() => {
      this.sys.showToast('Senha alterada com sucesso.', { classname: 'bg-success text-light', delay: 4000 })
      this.router.navigate(['/auth/entrar'])
    })
    .catch((err) => {
      let msg = 'Não foi possível recuperar a senha.'
      if (err && err.code) {
        switch (err.code) {
          case 'auth/expired-action-code':
            msg = 'Link expirado. Tente recuperar novamente.'
            break;
          case 'auth/invalid-action-code':
            msg = 'Link inválido. Tente recuperar novamente.'
            break;
          case 'auth/user-disabled':
            msg = 'Usuário desabilitado. Entre em contato conosco.'
            break;
          case 'auth/user-not-found':
            msg = 'Usuário não encontrado.'
            break;
          case 'auth/weak-password':
            msg = 'A senha escolhida é muito fraca.'
            break;
        }
      }
      this.sys.showToast(msg, { classname: 'bg-danger text-light', delay: 4000 })
    });
    this.loading = false;
  }
}
