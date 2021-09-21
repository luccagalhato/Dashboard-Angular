import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentData, DocumentsService } from '../documents.service';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {
  files$: Observable<DocumentData[]>;
  files = [];

  constructor(private docs: DocumentsService) {
    this.files$ = this.docs.getFiles('impostos')
  }

  ngOnInit(): void {
  }
}
