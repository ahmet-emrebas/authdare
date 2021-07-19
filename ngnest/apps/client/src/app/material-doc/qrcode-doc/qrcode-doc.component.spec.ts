import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeDocComponent } from './qrcode-doc.component';

describe('QrcodeDocComponent', () => {
  let component: QrcodeDocComponent;
  let fixture: ComponentFixture<QrcodeDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodeDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
