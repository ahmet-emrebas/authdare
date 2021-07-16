import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDocComponent } from './material-doc.component';

describe('MaterialDocComponent', () => {
  let component: MaterialDocComponent;
  let fixture: ComponentFixture<MaterialDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
