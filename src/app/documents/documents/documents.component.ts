import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddDocumentModalComponent } from '../components/add-document-modal/add-document-modal.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  route;
  routeSubscription: Subscription;

  constructor(private modalService: NgbModal, private router: Router) {}

  ngOnInit(): void {
    this.routeSubscription = this.router.events.subscribe(() => {
      this.updateRouteUrl()
    })
    this.updateRouteUrl()
  }

  updateRouteUrl() {
    switch (this.router.url) {
      case '/documentos/empresa':
        this.route = 'empresa';
        break;
      case '/documentos/taxas':
        this.route = 'taxas'
        break;
      case '/documentos/impostos':
        this.route = 'impostos';
        break;
      case '/documentos/certidoes':
        this.route = 'certidoes';
        break;
      default:
        this.route = 'empresa';
    }
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  openAddDocument() {
    const modalRef = this.modalService.open(AddDocumentModalComponent);
    modalRef.componentInstance.relativePath = this.route;
  }
}
