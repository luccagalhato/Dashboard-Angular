import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DocumentsComponent } from './documents/documents.component';
import { CompanyComponent } from './company/company.component';
import { AddDocumentModalComponent } from './components/add-document-modal/add-document-modal.component';
import { ListItemComponent } from './list-item/list-item.component';
import { TaxesComponent } from './taxes/taxes.component';
import { FeesComponent } from './fees/fees.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { HttpClientModule } from '@angular/common/http';
import { DocumentsService } from './documents.service';


@NgModule({
  declarations: [DocumentsComponent, CompanyComponent, AddDocumentModalComponent, ListItemComponent, TaxesComponent, FeesComponent, CertificatesComponent, TagsInputComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    DocumentsService
  ]
})
export class DocumentsModule { }
