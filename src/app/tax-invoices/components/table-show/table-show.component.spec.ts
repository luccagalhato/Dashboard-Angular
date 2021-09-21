import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TableShowComponent } from './table-show.component';
class DumbComponent {}

describe('TableShowComponent', () => {
  let component: TableShowComponent;
  let fixture: ComponentFixture<TableShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableShowComponent],
      providers: [
        { provide: NgbActiveModal, useClass: DumbComponent },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
