import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingsSubscriptionsComponent } from './billings-subscriptions.component';

xdescribe('BillingsSubscriptionsComponent', () => {
  let component: BillingsSubscriptionsComponent;
  let fixture: ComponentFixture<BillingsSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingsSubscriptionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingsSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
