import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheckCircle, faCircleNotch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SystemService } from 'src/app/system.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tax-settings',
  templateUrl: './tax-settings.component.html',
  styleUrls: ['./tax-settings.component.scss']
})
export class TaxSettingsComponent implements OnInit {
  faExit = faSignOutAlt;
  faCheckCircle = faCheckCircle;
  faCircleNotch = faCircleNotch;
  form: FormGroup;
  loading = false;
  submitted = false;

  company: any;
  companyId: String;
  token: String;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth,
    private sys: SystemService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nfeActive: [false],
      nfseActive: [false],
      nfceActive: [false],
      nfeSerie: [''],
      nfeLast: [''],
      nfseSerie: [''],
      nfseLast: [''],
      defaultIssRate: [5],
      nfceSerie: [''],
      nfceLast: [''],
      cscId: [''],
      csc: ['']
    });

    this.afAuth.currentUser.then((user) => {
      user?.getIdTokenResult(false).then((tokenResult) => {
        this.token = tokenResult.token
        if (tokenResult.claims.company) {
          this.companyId = tokenResult.claims.company;
          this.getCompany();
        }
      });
    })
  }

  updateCompany() {
    this.loading = true;
    this.form.disable()
    this.sys.openLoading('Atualizando Dados Fiscais...')

    const headers = {"Authorization": `Bearer ${this.token}`}
    this.http.put(`${environment.baseApiUrl}/companies/${this.companyId}`, this.form.value, {headers: headers})
    .toPromise()
    .then((response) => {
      this.sys.showToast('Dados atualizados.', { classname: 'bg-success text-light', delay: 4000 })
      this.router.navigate(['/cadastro/importacao']);
    })
    .catch(() => {
      this.sys.showToast('Não foi possível atualizar a empresa.', { classname: 'bg-danger text-light', delay: 4000 })
    })
    .finally(() => {
      this.loading = false;
      this.sys.closeLoading();
    });
  }

  getCompany() {
    this.sys.openLoading('Recuperando dados...')
    const headers = {"Authorization": `Bearer ${this.token}`}
    this.http.get(`${environment.baseApiUrl}/companies/${this.companyId}`, {headers: headers})
    .toPromise()
    .then((response) => {
      this.company = response;
      this.form.patchValue(response);
    })
    .finally(() => {
      this.loading = false;
      this.sys.closeLoading();
    });
  }

  async logout() {
    await this.afAuth.signOut()
    this.sys.showToast('Você saiu.', { classname: 'bg-info text-light', delay: 4000 })
    this.router.navigate(['/auth/entrar'])
  }
}
