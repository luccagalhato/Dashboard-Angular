import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { TaxesService } from '../../taxes.service';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SystemService } from 'src/app/system.service';

@Component({
  selector: 'app-calculation-modal',
  templateUrl: './calculation-modal.component.html',
  styleUrls: ['./calculation-modal.component.scss'],
})
export class CalculationModalComponent implements OnInit {
  company$: Observable<any>;
  form: FormGroup;

  constructor(public modalRef: NgbActiveModal, private taxSrv: TaxesService,
    private fb: FormBuilder, private sys: SystemService) {}

  ngOnInit(): void {
    this.company$ = this.taxSrv.getCompany();
    this.company$.pipe(take(1)).toPromise().then((company) => {
      this.form = this.fb.group({
        month: moment().subtract(1, 'month').format('MM'),
        year: moment().subtract(1, 'month').format('YYYY')
      });
    })
  }

  addRow() {
    let table = document.getElementById(
      'calculation-modal-table'
    ) as HTMLTableElement;
    let row = table.insertRow();
    row.style.height = '40px';
    row.style.fontSize = '13px';
    row.style.fontWeight = '500';
    row.style.borderBottom = '1px solid #f5f5f5';
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = 'Documento';
    cell2.innerHTML = '01/01/2020';
  }

  async createTax() {
    this.sys.openLoading('Processando...');
    const response = await this.taxSrv.createTax({
      period: `${this.form.value.month}-${this.form.value.year}`
    }).pipe(take(1)).toPromise().then(() => {
      this.sys.showToast('Processamento realizado.', { classname: 'bg-success text-light', delay: 4000 })
      this.sys.closeLoading();
      this.modalRef.close(true);
    })
    .catch((err) => {
      this.sys.showToast('Não foi possível apurar o imposto', { classname: 'bg-danger text-light', delay: 4000 })
      this.sys.closeLoading();
      this.modalRef.close(false);
    });


  }
}
