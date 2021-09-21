import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import * as moment from 'moment';
import * as uuid from 'uuid';

export interface FiscalTableItem {
  id: string;
  date: Date;
  internalRevenue: number;
  externalRevenue: number;
  total: number;
}

export interface FiscalItem {
  key: 'Lucro Presumido' | 'SIMPLES';
  title: string;
  desc: string;
  period: string;
  total: number;
  data: FiscalTableItem[];
  editableMonth: boolean;
}

@Component({
  selector: 'app-fiscal',
  templateUrl: './fiscal.component.html',
  styleUrls: ['./fiscal.component.scss'],
  providers: [DatePipe],
})
export class FiscalComponent implements OnInit, AfterViewInit {
  profitTableData: FiscalTableItem[] = Array.from({ length: 12 }, (v, i) => {
    let year = moment().format('YYYY');
    let row: FiscalTableItem = {
      id: uuid.v4(),
      date: moment().add(i, 'M').toDate(),
      internalRevenue: 0,
      externalRevenue: 0,
      total: 0,
    };
    return row;
  });

  simplesData: FiscalTableItem[] = Array.from({ length: 12 }, (v, i) => {
    let row: FiscalTableItem = {
      id: uuid.v4(),
      date: moment().add(i, 'M').toDate(),
      internalRevenue: 0,
      externalRevenue: 0,
      total: 0,
    };
    return row;
  });

  items: FiscalItem[] = [
    {
      key: 'SIMPLES',
      title: 'simples',
      desc: 'Receita Bruta Acumulada - 12 MESES',
      period: `${moment().format('MMM/yy')} até ${moment()
        .add(11, 'M')
        .format('MMM/yy')}`,
      total: 0,
      data: [...this.simplesData.map((a) => ({ ...a }))].map((x) => {
        let _a = x;
        _a.id = uuid.v4();
        return _a;
      }),
      editableMonth: true,
    },

    {
      key: 'SIMPLES',
      title: 'simples',
      desc: 'Receita Bruta Acumulada - 12 MESES',
      period: `${moment().format('MMM/yy')} até ${moment()
        .add(11, 'M')
        .format('MMM/yy')}`,
      total: 0,
      data: [...this.simplesData.map((a) => ({ ...a }))].map((x) => {
        let _a = x;
        _a.id = uuid.v4();
        return _a;
      }),
      editableMonth: true,
    },

    {
      key: 'Lucro Presumido',
      title: 'LUCRO PRESUMIDO',
      desc: 'Faturamento do Período',
      period: moment().format('YYYY'),
      total: 0,
      data: this.profitTableData,
      editableMonth: false,
    },
  ];

  selectedItem: string = 'SIMPLES';

  constructor(private cdRef: ChangeDetectorRef, private datePipe: DatePipe) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onCellEditBegin(event, item?: FiscalTableItem) {
    event.target.select();
  }
  onCellEditDone(
    event,
    item: FiscalTableItem,
    fiscalItem: FiscalItem,
    index?: number
  ) {
    item.total = Number(item.externalRevenue + item.internalRevenue);
    fiscalItem.total = 0;
    fiscalItem.data.forEach((element) => {
      fiscalItem.total += element.total;
    });
    this.cdRef.detectChanges();
  }

  addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  updateMonths(event, item: FiscalTableItem, dataSet: FiscalTableItem[]) {
    let input = document.getElementById('month-th');
    dataSet.map((x, i) => {
      let _date = moment(item.date);
      x.date = _date.add(i, 'M').toDate();
    });
    setTimeout(() => {
      input.click();
    }, 100);
  }
}
