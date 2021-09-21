import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

const DOC_NAMES = {
  'CONTRACT': 'Contrato Social ou Estatuto',
  'CONTRACT_CHANGE': 'Alterações Contratuais',
  'LOCAL_REGISTRATION': 'Ficha de Cadastro Municipal',
  'STATE_REGISTRATION': 'Ficha de Cadastro Estadual',
  'CNPJ': 'Ficha CNPJ',
  'NCD': 'Certidão Negativa de Débito',
  'FGTS': 'Certidão FGTS'
}

@Component({
  selector: 'app-doc-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() file;
  docNames = DOC_NAMES;
  orgNames = {
    'RECEITA_FEDERAL': 'Receita Federal',
    'PREFEITURA': 'Prefeitura',
    'SINTEGRA': 'Sintegra',
    'SEFAZ': 'SEFAZ'
  }

  constructor() { }

  ngOnInit(): void {
  }

  isExpired(date) {
    return moment(date).isBefore(moment());
  }
}
