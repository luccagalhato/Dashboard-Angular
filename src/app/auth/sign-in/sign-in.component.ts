import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;

  constructor(private fb: FormBuilder, private sys: SystemService,
    private afAuth: AngularFireAuth, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  async login(event: any) {
    event.preventDefault();
    this.loading = true;
    if (this.form.valid) {
      await this.afAuth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password).then(async (userCredential) => {
        if (userCredential.user) {
          this.sys.showToast('Login realizado com sucesso!', { classname: 'bg-success text-light', delay: 4000 })
          return await userCredential.user.getIdTokenResult(false).then((tokenResult) => {
            if (tokenResult && tokenResult.claims && !tokenResult.claims.company) {
              this.router.navigate(['/cadastro/empresa']);
            } else {
              this.router.navigate(['/dashboard'])
            }
          })
        } else {
          this.sys.showToast('Não foi possível fazer o login.', { classname: 'bg-danger text-light', delay: 4000 })
        }
      })
      .catch((err) => {
        if (err && err.code === 'auth/email-already-in-use') {
          this.sys.showToast('Email já está sendo utilizado.', { classname: 'bg-danger text-light', delay: 4000 })
        } else {
          this.sys.showToast('Não foi possível entrar.', { classname: 'bg-danger text-light', delay: 4000 })
        }
      })
    }
    this.loading = false;
    this.submitted = true;
  }


  async signInWithGoogle(event: any) {
    event.preventDefault();
    this.loading = true;
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await this.afAuth.signInWithPopup(googleProvider).then((userCredential) => {
      if (userCredential.user) {
        this.sys.showToast('Login realizado com sucesso!', { classname: 'bg-success text-light', delay: 4000 })
        userCredential.user.getIdTokenResult(true).then((tokenResult) => {
          if (tokenResult && tokenResult.claims && !tokenResult.claims.company) {
            this.router.navigate(['/cadastro/empresa']);
          } else {
            this.router.navigate(['/dashboard'])
          }
        })
      } else {
        this.sys.showToast('Não foi possível criar conta.', { classname: 'bg-danger text-light', delay: 4000 })
      }
    })
    .catch((err) => {
      if (err && err.code === 'auth/email-already-in-use') {
        this.sys.showToast('Email já está sendo utilizado.', { classname: 'bg-danger text-light', delay: 4000 })
      } else {
        this.sys.showToast('Não foi possível entrar.', { classname: 'bg-danger text-light', delay: 4000 })
      }
    })
    this.loading = false;
  }
}
