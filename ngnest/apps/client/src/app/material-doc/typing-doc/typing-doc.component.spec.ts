import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingDocComponent } from './typing-doc.component';

describe('TypingDocComponent', () => {
  let component: TypingDocComponent;
  let fixture: ComponentFixture<TypingDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
