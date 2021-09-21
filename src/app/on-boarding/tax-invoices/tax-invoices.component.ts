import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { faSignOutAlt, faCheckCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { finalize, map, take } from 'rxjs/operators';
import { SystemService } from 'src/app/system.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tax-invoices',
  templateUrl: './tax-invoices.component.html',
  styleUrls: ['./tax-invoices.component.scss']
})
export class TaxInvoicesComponent implements OnInit {
  faExit = faSignOutAlt;
  faCheckCircle = faCheckCircle;
  faCircleNotch = faCircleNotch;
  token = '';
  files = <any>[];

  constructor(private afAuth: AngularFireAuth, public location: Location,
    private sys: SystemService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      setTimeout(() => {
        user?.getIdTokenResult(true).then((tokenResult) => {
          this.token = tokenResult.token
        });
      }, 5000);
    })
  }

  async logout() {
    await this.afAuth.signOut()
    this.sys.showToast('Você saiu.', { classname: 'bg-info text-light', delay: 4000 })
    this.router.navigate(['/auth/entrar'])
  }

  uploadFiles() {
    this.sys.openLoading('Fazendo upload de arquivos')
    let formData: FormData = new FormData();
    this.files.map((file: any) => {
      formData.append('invoices', file);
    })
    const headers = {"Authorization": `Bearer ${this.token}`}
    this.http.post(`${environment.baseApiUrl}/upload-invoices`, formData, {headers: headers})
    .pipe(take(1))
    .toPromise()
    .then((result) => {
      this.sys.showToast('Arquivos enviados com sucesso', { classname: 'bg-success text-light', delay: 4000 })
      this.sys.closeLoading()
      this.router.navigate(['/cadastro/finalizado'])
    })
    .catch((err) => {
      this.sys.showToast(err.error, { classname: 'bg-danger text-light', delay: 4000 })
      this.sys.closeLoading()
    })
  }

  fileChange(event: any) {
    this.files = Array.from(event.target.files);
    console.log(this.files)
  }

  selectedFiles() {
    if (this.files.length === 1) {
      return this.files[0].name
    } else if (this.files.length > 1) {
      return `${this.files.length} arquivos selecionados`
    } else {
      return ''
    }
  }
}
