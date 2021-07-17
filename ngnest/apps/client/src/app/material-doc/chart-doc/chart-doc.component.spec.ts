import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDocComponent } from './chart-doc.component';

describe('ChartDocComponent', () => {
  let component: ChartDocComponent;
  let fixture: ComponentFixture<ChartDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
