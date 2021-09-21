import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SystemService } from 'src/app/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  form: FormGroup;
  submitted = false;
  loading = false;
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
    this.form.controls.email.disable()
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      this.form.setValue({email: user?.email})
    })
    this.route.queryParamMap.pipe(take(1)).toPromise().then((params) => {
      this.mode = params.get('mode');
      this.oobCode = params.get('oobCode');
      this.apiKey = params.get('apiKey');

      if (this.mode === 'verifyEmail') {
        this.loading = true;
        this.afAuth.applyActionCode(this.oobCode ?? '')
        .then((_) => {
          this.router.navigate(['/'], {queryParams: {refreshToken: 'true'}})
          this.loading = false;
        })
        .catch((err) => {
          let msg = 'Não foi possível verificar o email'
          if (err && err.code) {
            switch (err.code) {
              case 'auth/expired-action-code':
                msg = 'Link expirado. Tente enviar novamente.'
                break;
              case 'auth/invalid-action-code':
                msg = 'Link inválido. Tente enviar novamente.'
                break;
              case 'auth/user-disabled':
                msg = 'Usuário desabilitado. Entre em contato conosco.'
                break;
              case 'auth/user-not-found':
                msg = 'Usuário não encontrado.'
                break;
            }
            this.loading = false;
          }
          this.sys.showToast(msg, { classname: 'bg-danger text-light', delay: 4000 })
       });
      }
    })
  }

  async logout() {
    await this.afAuth.signOut()
    this.sys.showToast('Você saiu.', { classname: 'bg-info text-light', delay: 4000 })
    this.router.navigate(['/auth/entrar'])
  }

  async sendConfirmationLink(event: any) {
    event.preventDefault();
    this.loading = true;
    await this.afAuth.currentUser.then(async (user) => {
      this.form.setValue({email: user?.email})
      return await user?.sendEmailVerification({
        url: `${environment.domain}`
      })
    })
    .then((_) => {
      this.sys.showToast('Link enviado com sucesso! Verifique sua caixa de entrada', { classname: 'bg-success text-light', delay: 4000 })  
    })
    .catch((e) => {
      this.sys.showToast('Não foi possível enviar o email', { classname: 'bg-danger text-light', delay: 4000 })
    });
    this.loading = false;
  }
}
