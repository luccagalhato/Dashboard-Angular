import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { SystemService } from 'src/app/system.service';
import { environment } from 'src/environments/environment';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  token = '';
  files = <any>[];
  isCollapsed = true;
  downloadIcon = faDownload;

  constructor(public activeModal: NgbActiveModal, private sys: SystemService, private http: HttpClient,
    private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      user?.getIdTokenResult(false).then((tokenResult) => {
        this.token = tokenResult.token
      });
    })
  }

  async uploadFiles() {
    this.sys.openLoading('Fazendo upload de arquivos')

    const headers = {"Authorization": `Bearer ${this.token}`}
    let hasError = false;
    for (let index in this.files) {
      let i = parseInt(index)
      let file = this.files[i]
      let formData: FormData = new FormData();
      formData.append('invoices', file);
      let response = await this.http.post<any>(`${environment.baseApiUrl}/upload-invoices`, formData, {headers: headers})
      .pipe(take(1))
      .toPromise()
      .then((response) => response)
      .catch((err) => {
        return {error: err.error}
      })
      if (response.error) {
        hasError = true;
        this.files[i].error = response.error;
      }
      this.sys.changeLoadingType('progress-bar', ((i + 1) * 100 / this.files.length))
      this.sys.changeLoadingMessage(`Fazendo upload de arquivos... ${((i + 1) * 100 / this.files.length).toFixed(1)}%`)
    }
    this.sys.showToast('Uplaod finalizado', { classname: 'bg-success text-light', delay: 4000 })
    if (!hasError) {
      this.activeModal.close('Close click')
    }
    this.sys.closeLoading()
  }

  fileChange(event: any) {
    this.files = Array.from(event.target.files);
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

  fileWithErrors() {
    return this.files.filter((file: any) => file.error)
  }

  downloadFile() {
    const data = this.fileWithErrors().map((file: any) => [file.name, file.error]);
    let csvData = this.convertToCSV(data, ['arquivo', 'erro']);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", "import_errors.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

  convertToCSV(objArray: string[][], headerList: string[]) {
    let array = objArray
    let str = '';
    let row = '';
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in headerList) {
        line += ',' + array[i][index];
      }
      str += line.slice(1) + '\r\n';
    }
    return str;
  }
}
