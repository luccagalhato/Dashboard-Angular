import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nf-modal',
  templateUrl: './nf-modal.component.html',
  styleUrls: ['./nf-modal.component.scss'],
})
export class NfModalComponent implements OnInit {
  _files: any[] = [];
  constructor(public modalRef: NgbActiveModal) {}

  ngOnInit(): void {}

  importFiles() {
    this._files = [];
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xml';
    input.multiple = true;
    input.onchange = (e: any) => {
      let file;
      if (e.target && e.target.files) {
        this._files = [...e.target.files];
      }
    };

    input.click();
  }
}
