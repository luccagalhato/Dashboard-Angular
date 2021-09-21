import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes.component';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalculationModalComponent } from './components/calculation-modal/calculation-modal.component';
import { SimulationModalComponent } from './components/simulation-modal/simulation-modal.component';
import { NgxMaskModule } from 'ngx-mask';
import { ShowTaxComponent } from './show-tax/show-tax.component';
import { HttpClientModule } from '@angular/common/http';
import { TaxesService } from './taxes.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentsModule } from '../documents/documents.module';

@NgModule({
  declarations: [
    TaxesComponent,
    CalculationModalComponent,
    SimulationModalComponent,
    ShowTaxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TaxesRoutingModule,
    TableModule,
    DocumentsModule,
    NgbModule,
    NgxMaskModule,
  ],
  providers: [
    TaxesService
  ]
})
export class TaxesModule {}
