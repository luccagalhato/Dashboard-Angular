import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigsRoutingModule } from './configs-routing.module';
import { ConfigsComponent } from './configs.component';
import { CompanyComponent } from './components/company/company.component';
import { PartnersComponent } from './components/partners/partners.component';
import { FiscalComponent } from './components/fiscal/fiscal.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [
    ConfigsComponent,
    CompanyComponent,
    PartnersComponent,
    FiscalComponent,
  ],
  imports: [
    CommonModule,
    ConfigsRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    CalendarModule,
    InputMaskModule,
  ],
})
export class ConfigsModule {}
