import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [ListContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    NgxMaskModule.forChild(),
    NgbModule,
    TableModule
  ]
})
export class ContactsModule { }
