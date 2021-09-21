import { Injectable, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';

@Injectable({ providedIn: 'root' })
@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loadingRef: any;

  constructor(private modalService: NgbModal) { }

  toasts: any[] = [];

  showToast(textOrTpl: string, options: any = {}) {
    this.toasts = [{ textOrTpl, ...options }];
  }

  removeToast(toast: string) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  openLoading(message: string | null = null) {
    this.loadingRef = this.modalService.open(LoadingComponent, { centered: true, keyboard: false, backdrop: 'static', windowClass: 'loading' });
    if (message) {
      this.loadingRef.componentInstance.message = message;
    }
  }

  closeLoading() {
    this.loadingRef.close();
  }

  changeLoadingMessage(message: string) {
    this.loadingRef.componentInstance.message = message;
  }

  changeLoadingType(type: string, amount = 0) {
    if (type) {
      this.loadingRef.componentInstance.loading = type
      this.loadingRef.componentInstance.loadingAmount = amount;
    }
  }
}
