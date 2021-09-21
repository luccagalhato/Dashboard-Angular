import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSignOutAlt, faCheckCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { SystemService } from 'src/app/system.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  faExit = faSignOutAlt;
  faCheckCircle = faCheckCircle;
  faCircleNotch = faCircleNotch;
  form: FormGroup;
  loading = false;
  submitted = false;
  token = '';

  add = new FormControl('');

  constructor(private afAuth: AngularFireAuth, private sys: SystemService,
    private router: Router, private fb: FormBuilder, private http: HttpClient) {
      this.form = this.fb.group({
        cnpj: ['', Validators.required],
        regime: ['', Validators.required],
        name: [''],
        businessName: [''],
        stateRegistration: [''],
        cityRegistration: [''],
        postalCode: [''],
        number: [''],
        activities: [''],
        activitiesList: [''],
        cnaes: ['']
      })
    }

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      user?.getIdTokenResult(false).then((tokenResult) => {
        this.token = tokenResult.token
        if (tokenResult.claims.company) {
          this.router.navigate(['/cadastro/pagamento'])
        }
      });
    })
  }

  searchCNPJ(event: any) {
    this.loading = true;
    const cnpj = event.target.value.replace(/\.|\/|-/g, '');
    this.form.disable()
    this.sys.openLoading('Verificando CNPJ')

    const headers = {"Authorization": `Bearer ${this.token}`}
    this.http.get(`${environment.baseApiUrl}/companies/${cnpj}`, {headers: headers})
    .toPromise()
    .then((company) => {
      if (company) {
        this.sys.showToast('Este CNPJ já foi cadastrado.', { classname: 'bg-danger text-light', delay: 4000 })
      }
      this.form.enable()
      this.sys.closeLoading()
      this.loading = false;
    })
    .catch((err) => {
      if (err.status === 404) {
        this.sys.changeLoadingMessage('Buscando informações da empresa')
        this.http.get(`${environment.baseApiUrl}/companies/consult/${cnpj}`, {headers: headers})
        .toPromise()
        .then((result: any) => {
          const company = result[1];
          const simples = result[0];
          console.log(simples);
          let regime;
          if (simples.simei_situacao.startsWith('Enquadrado no SIMEI')) {
            regime = 'MEI';
          } else if (simples.simples_nacional_situacao.startsWith('Optante pelo Simples Nacional')) {
            regime = 'Simples Nacional';
          } else {
            regime = 'Lucro Presumido';
          }
          let atividades = [company.atividade_economica];
          if (company.atividade_economica_secundaria_lista != ['Não informada']) {
            atividades = atividades.concat(company.atividade_economica_secundaria_lista)
          }

          this.form.patchValue({
            cnpj: company.normalizado_cnpj,
            name: company.nome_fantasia,
            businessName: company.razao_social,
            postalCode: company.normalizado_endereco_cep,
            number: company.endereco_numero,
            activities: atividades,
            activitiesList: atividades.join('\n'),
            cnaes: atividades.map(a => a.split(' - ')[0]),
            regime: regime
          })
          this.form.enable()
          this.sys.closeLoading()
          this.loading = false;
        })
        .catch(e => {
          this.form.enable()
          this.sys.closeLoading()
          this.loading = false;
        })
      } else {
        this.form.enable()
        this.sys.closeLoading()
        this.loading = false;
      }
    })
    /*this.afFunc.httpsCallable('consultCNPJ')(cnpj)
    .toPromise()
    .then((result) => {
      if (result.status === 200) {
        let atividades = [result.body.atividade_economica];
        if (result.body.atividade_economica_secundaria_lista != ['Não informada']) {
          atividades = atividades.concat(result.body.atividade_economica_secundaria_lista)
        }

        this.form.patchValue({
          cnpj: result.body.normalizado_cnpj,
          nome_fantasia: result.body.nome_fantasia,
          razao_social: result.body.razao_social,
          cep: result.body.normalizado_endereco_cep,
          numero: result.body.endereco_numero,
          atividades: atividades,
          atividades_lista: atividades.join('\n'),
          cnaes: atividades.map(a => a.split(' - ')[0])
        })
      } else {
        console.log(result.message)
      }
      this.form.enable()
      this.sys.closeLoading()
      this.loading = false;
    })
    .catch(e => {
      if (e && e.message === 'CNPJ já foi cadastrado') {
        this.sys.showToast('Este CNPJ já foi cadastrado.', { classname: 'bg-danger text-light', delay: 4000 })
      }
      this.form.enable()
      this.sys.closeLoading()
      this.loading = false;
    })*/
  }

  createCompany() {
    this.loading = true;
    this.submitted = true;
    this.form.updateValueAndValidity()
    if (this.form.valid) {
      this.form.disable()
      this.sys.openLoading('Cadastrando empresa')
      const companyData = this.form.value;

      const headers = {"Authorization": `Bearer ${this.token}`}
      this.http.post(`${environment.baseApiUrl}/companies`, companyData, {headers: headers})
      .toPromise()
      .then((response) => {
        this.afAuth.currentUser.then((user) => {
          user?.getIdTokenResult(true)
        })
        this.router.navigate(['/cadastro/pagamento'])
        this.form.enable()
        this.sys.closeLoading()
        this.loading = false;
      })
      .catch((err) => {
        this.sys.showToast('Não foi possível cadastrar a empresa.', { classname: 'bg-danger text-light', delay: 4000 })
        this.form.enable()
        this.sys.closeLoading()
        this.loading = false;
      })
      /*this.afFunc.httpsCallable('createCompany')(companyData)
      .toPromise()
      .then((result) => {
        if (result.status === 200) {
          this.afAuth.currentUser.then((user) => {
            user?.getIdTokenResult(true)
          })
          this.router.navigate(['/cadastro/importacao'])
        } else {
          alert("Algo deu errado")
        }
        this.form.enable()
        this.sys.closeLoading()
        this.loading = false;
      })
      .catch((e) => {
        if (e && e.message === 'CNPJ já foi cadastrado') {
          this.sys.showToast('Este CNPJ já foi cadastrado.', { classname: 'bg-danger text-light', delay: 4000 })
        }
        this.form.enable()
        this.sys.closeLoading()
        this.loading = false;
      })*/
    } else {
      this.loading = false;
    }
  }

  addActivity() {
    const activities = (this.form.value.activities || []).concat([this.add.value]);
    this.form.patchValue({
      activities: activities,
      activitiesList: activities.join('\n'),
      cnaes: activities.map(a => a.split(' - ')[0]),
    })
    this.add.setValue('');
  }

  async logout() {
    await this.afAuth.signOut()
    this.sys.showToast('Você saiu.', { classname: 'bg-info text-light', delay: 4000 })
    this.router.navigate(['/auth/entrar'])
  }
}
