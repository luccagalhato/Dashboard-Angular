import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';

export interface PaymentData {
  id: string;
  date: string;
  product: string;
  price: number;
  status: 'Pending' | 'Invoice Sent' | 'Completed';
}

@Component({
  selector: 'app-billings-payments',
  templateUrl: './billings-payments.component.html',
  styleUrls: ['./billings-payments.component.scss'],
})
export class BillingsPaymentsComponent implements OnInit {
  selectedProducts: PaymentData[];
  data: PaymentData[] = [
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Completed',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Pending',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Invoice Sent',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Invoice Sent',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Completed',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Completed',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Pending',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Invoice Sent',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Invoice Sent',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Completed',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Invoice Sent',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Invoice Sent',
    },
    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Completed',
    },

    {
      id: uuid.v4(),
      date: '01/03/2021',
      product: 'Higspeed Studios',
      price: 650036.34,
      status: 'Invoice Sent',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
