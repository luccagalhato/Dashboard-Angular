import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentData, DocumentsService } from '../documents.service';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {
  files$: Observable<DocumentData[]>;

  constructor(private docs: DocumentsService) {
    this.files$ = this.docs.getFiles('taxas')
  }

  ngOnInit(): void {
  }
}
