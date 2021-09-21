import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingsPaymentsComponent } from './billings-payments.component';

xdescribe('BillingsPaymentsComponent', () => {
  let component: BillingsPaymentsComponent;
  let fixture: ComponentFixture<BillingsPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingsPaymentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingsPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
