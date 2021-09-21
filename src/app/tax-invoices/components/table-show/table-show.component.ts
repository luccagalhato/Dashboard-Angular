import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-show',
  templateUrl: './table-show.component.html',
  styleUrls: ['./table-show.component.scss'],
})
export class TableShowComponent implements OnInit {
  constructor(public modalRef: NgbActiveModal) {}

  ngOnInit(): void {}
}
