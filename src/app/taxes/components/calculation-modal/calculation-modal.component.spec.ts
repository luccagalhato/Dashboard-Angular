import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationModalComponent } from './calculation-modal.component';

xdescribe('CalculationModalComponent', () => {
  let component: CalculationModalComponent;
  let fixture: ComponentFixture<CalculationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculationModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
