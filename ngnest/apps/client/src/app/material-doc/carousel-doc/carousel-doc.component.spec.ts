import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDocComponent } from './carousel-doc.component';

describe('CarouselDocComponent', () => {
  let component: CarouselDocComponent;
  let fixture: ComponentFixture<CarouselDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
