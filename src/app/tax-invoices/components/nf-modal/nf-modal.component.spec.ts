import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NfModalComponent } from './nf-modal.component';

export class DumbComponent {}

describe('NfModalComponent', () => {
  let component: NfModalComponent;
  let fixture: ComponentFixture<NfModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [NfModalComponent],
      providers: [{ provide: NgbActiveModal, useClass: DumbComponent }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
