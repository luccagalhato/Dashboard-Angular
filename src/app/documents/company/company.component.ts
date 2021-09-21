import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentData, DocumentsService } from '../documents.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  files$: Observable<DocumentData[]>;

  constructor(private docs: DocumentsService) {
    this.files$ = this.docs.getFiles('empresa')
  }

  ngOnInit(): void {
  }
}
