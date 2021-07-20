import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDocComponent } from './invoice-doc.component';

describe('InvoiceDocComponent', () => {
  let component: InvoiceDocComponent;
  let fixture: ComponentFixture<InvoiceDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
