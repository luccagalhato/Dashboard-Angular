import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() message = 'Carregando'
  @Input() loading = 'spinner'
  @Input() loadingAmount = 0;

  constructor() { }

  ngOnInit(): void {
  }
}
