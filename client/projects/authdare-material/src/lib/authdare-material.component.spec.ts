import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthdareMaterialComponent } from './authdare-material.component';

describe('AuthdareMaterialComponent', () => {
  let component: AuthdareMaterialComponent;
  let fixture: ComponentFixture<AuthdareMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthdareMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthdareMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
