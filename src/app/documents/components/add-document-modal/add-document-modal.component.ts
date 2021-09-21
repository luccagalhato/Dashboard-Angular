import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { SystemService } from 'src/app/system.service';
import { DocumentsService } from '../../documents.service';

const STATES = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]
const DOC_TYPES = [
  'CONTRACT',
  'CONTRACT_CHANGE',
  'CNPJ',
  'LOCAL_REGISTRATION',
  'STATE_REGISTRATION',
  'NCD',
  'FGTS'
]

const DOC_NAMES = {
  'CONTRACT': 'Contrato Social ou Estatuto',
  'CONTRACT_CHANGE': 'Alterações Contratuais',
  'LOCAL_REGISTRATION': 'Ficha de Cadastro Municipal',
  'STATE_REGISTRATION': 'Ficha de Cadastro Estadual',
  'CNPJ': 'Ficha CNPJ',
  'NCD': 'Certidão Negativa de Débito',
  'FGTS': 'Certidão FGTS'
}

const ORGS = [
  'RECEITA_FEDERAL',
  'PREFEITURA',
  'SINTEGRA',
  'SEFAZ'
]

export interface Tag {
  color: string;
  text: string;
}

@Component({
  selector: 'app-add-document-modal',
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.scss'],
})
export class AddDocumentModalComponent implements OnInit {
  @Input() relativePath;

  formSubscription: Subscription;
  form: FormGroup;
  submitted: boolean;
  selectedFile: any;

  states = STATES;

  constructor(public modalRef: NgbActiveModal, private fb: FormBuilder, private docs: DocumentsService,
      private sys: SystemService) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      expirationDate: [null],
      org: [],
      state: [],
      uploadedAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
      tags: []
    });
  }

  async submit() {
    this.submitted = true;
    if (this.form.valid && this.selectedFile) {
      this.sys.openLoading('Enviando arquivo...')
      let expDate = this.form.value.expirationDate;
      if (expDate) {
        expDate = `${expDate.year}-${expDate.month}-${expDate.day}`
      }
      const metadata = {
        customMetadata: Object.assign(this.form.value, {expirationDate: expDate})
      }
      await this.docs.uploadDocument(this.selectedFile, `${this.relativePath}/${this.selectedFile.name}`, metadata);
      this.sys.closeLoading()
      this.modalRef.dismiss()
    }
  }

  fileChange(event: any) {
    this.selectedFile = event.target.files.item(0);
  }

  ngOnInit(): void {
    this.formSubscription = this.form.controls.type.valueChanges.subscribe((value) => {
      if (value === 'CNPJ') {
        this.form.patchValue({org: 'RECEITA_FEDERAL'})
      } else if (value === 'STATE_REGISTRATION') {
        this.form.patchValue({org: 'SINTEGRA'})
      }
    })
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  hasExpirationDate() {
    return this.relativePath === 'certidoes' || this.relativePath === 'taxas';
  }

  getNameOptions() {
    switch (this.relativePath) {
      case 'empresa':
        return ['CONTRACT', 'CONTRACT_CHANGE', 'CNPJ', 'LOCAL_REGISTRATION', 'STATE_REGISTRATION'].map(key => {
          return {key: key, value: DOC_NAMES[key]};
        });
      case 'certidoes':
        return ['NCD', 'FGTS'].map(key => {
          return {key: key, value: DOC_NAMES[key]};
        })
      default:
        return null;
    }
  }

  isAutomatic() {
    switch (this.relativePath) {
      case 'empresa':
        if (this.form.value.type === 'CNPJ' ||
          this.form.value.type === 'STATE_REGISTRATION') {
            return true;
        }
        return false;
      case 'certidoes':
        return this.form.value.type !== 'NCD' || 
          this.form.value.org !== 'PREFEITURA';
      default:
        return false;
    }
  }

  async updateDocument() {
    this.sys.openLoading('Atualizando documento...')
    await this.docs.updateDocument(this.form.value).then((response) => {
      this.sys.showToast('Documento atualizado com sucesso', { classname: 'bg-success text-light', delay: 4000 })
      this.modalRef.close()
    })
    .catch((response) => {
      if (response.error?.error) {
        this.sys.showToast(response.error.error, { classname: 'bg-danger text-light', delay: 8000 })
      } else {
        this.sys.showToast('Não foi possível completar a atualização', { classname: 'bg-danger text-light', delay: 4000 })
      }
    })
    this.sys.closeLoading();
  }
}
