import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingsGeneralComponent } from './billings-general.component';

xdescribe('BillingsGeneralComponent', () => {
  let component: BillingsGeneralComponent;
  let fixture: ComponentFixture<BillingsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingsGeneralComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
