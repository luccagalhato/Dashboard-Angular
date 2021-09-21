import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxInvoicesRoutingModule } from './tax-invoices-routing.module';
import { ImportComponent } from './import/import.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImportedComponent } from './imported/imported.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ImportComponent, ImportedComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaxInvoicesRoutingModule,
    NgbModule,
    FontAwesomeModule,
    NgxMaskModule.forChild(),
    HttpClientModule,
    NgbDatepickerModule,
    TableModule,
  ],
})
export class TaxInvoicesModule {}
