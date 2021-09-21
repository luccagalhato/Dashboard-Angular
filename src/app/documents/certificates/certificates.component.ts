import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentData, DocumentsService } from '../documents.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  files$: Observable<DocumentData[]>;

  constructor(private docs: DocumentsService) {
    this.files$ = this.docs.getFiles('certidoes')
  }

  ngOnInit(): void {
  }
}
