import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPersistentComponent } from './carousel-persistent.component';

describe('CarouselPersistentComponent', () => {
  let component: CarouselPersistentComponent;
  let fixture: ComponentFixture<CarouselPersistentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselPersistentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselPersistentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
