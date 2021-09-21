import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { of } from 'rxjs';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { DocumentsService } from 'src/app/documents/documents.service';
import { TaxesService } from '../taxes.service';

@Component({
  selector: 'app-show-tax',
  templateUrl: './show-tax.component.html',
  styleUrls: ['./show-tax.component.scss']
})
export class ShowTaxComponent implements OnInit {
  tax$: Observable<any>;
  taxDocRef$: Observable<any>;
  company$: Observable<{}>;
  filter$: Observable<{}>;
  calculation$: Observable<{}>;
  periodType;

  constructor(private taxesService: TaxesService, private route: ActivatedRoute, public location: Location,
    private docSrv: DocumentsService) { }

  ngOnInit(): void {
    this.filter$ = this.route.queryParamMap.pipe(
      map((params) => {
        return {
          type: params.get('type'),
          period: params.get('period') || moment().format('MM-YYYY'),
          document: params.get('document'),
        };
      })
    );
  
    this.tax$ = this.route.params.pipe(
      switchMap((params) => {
        const id = params.id;
        const result = decodeURIComponent(id.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
        const taxName = result.split('/')[0];
        const period = result.split('/')[1];
        if (period.match(/^\d{2}-\d{4}$/)) {
          this.periodType = 'month';
        } else if (period.match(/^\dT-\d{4}$/)) {
          this.periodType = 'quarter';
        }
        return this.taxesService.getTaxes(this.filter$, period).pipe(
          map(impostos => {
            return impostos.filter((tax) => tax.tax === taxName && tax.period === period)[0];
          })
        )
      })
    )
    this.taxDocRef$ = this.tax$.pipe(
      switchMap(tax => {
        return this.docSrv.getFile(tax.docUrl);
      }),
      map(tax => {
        console.log(tax)
        return tax;
      })
    )
    this.company$ = this.taxesService.getCompany();
    this.calculation$ = this.taxesService.getCalculation(this.filter$);
  }

  formatDate(date) {
    if (date.match(/^\d{2}-\d{4}$/)) {
      return moment(date, 'MM-YYYY').format('MMMM / YYYY');
    } else if (date.match(/^\dT-\d{4}$/)) {
      return moment(date, 'QT-YYYY').format('Qº') + ' Trimestre';
    } else {
      return date;
    }
  }
}
