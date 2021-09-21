import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as moment from 'moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthorizedLayoutComponent } from './authorized-layout/authorized-layout.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';

import { NgxMaskModule } from 'ngx-mask';
import { LoadingComponent } from './loading/loading.component';
import { SidebarModule } from 'ng-sidebar';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NfModalComponent } from './tax-invoices/components/nf-modal/nf-modal.component';
import { TableShowComponent } from './tax-invoices/components/table-show/table-show.component';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DashboardModule } from './dashboard/dashboard.module';

registerLocaleData(localePt, 'pt');
moment.locale('pt');

@NgModule({
  declarations: [
    AppComponent,
    AuthorizedLayoutComponent,
    LoadingComponent,
    NfModalComponent,
    TableShowComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    DashboardModule,
    NgbModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxMaskModule.forRoot(),
    SidebarModule.forRoot(),
    ChartsModule,
    NgCircleProgressModule.forRoot(),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
