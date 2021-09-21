import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalComponent } from './fiscal.component';

xdescribe('FiscalComponent', () => {
  let component: FiscalComponent;
  let fixture: ComponentFixture<FiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiscalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
