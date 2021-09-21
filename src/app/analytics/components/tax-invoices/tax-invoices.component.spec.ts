import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxInvoicesComponent } from './tax-invoices.component';

xdescribe('TaxInvoicesComponent', () => {
  let component: TaxInvoicesComponent;
  let fixture: ComponentFixture<TaxInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxInvoicesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
