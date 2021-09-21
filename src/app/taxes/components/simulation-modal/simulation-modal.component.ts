import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simulation-modal',
  templateUrl: './simulation-modal.component.html',
  styleUrls: ['./simulation-modal.component.scss'],
})
export class SimulationModalComponent implements OnInit {
  constructor(public modalRef: NgbActiveModal) {}

  ngOnInit(): void {}

  addRow() {
    let table = document.getElementById(
      'calculation-modal-table'
    ) as HTMLTableElement;
    let row = table.insertRow();
    row.style.height = '40px';
    row.style.fontSize = '13px';
    row.style.borderBottom = '1px solid #f5f5f5';
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.style.fontWeight = '500';
    cell2.style.fontWeight = '600';
    cell1.innerHTML = 'Serviço A';
    cell2.innerHTML = 'R$ 2.000,00';
  }
}
