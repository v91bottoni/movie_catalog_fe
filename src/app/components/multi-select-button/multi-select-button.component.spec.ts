import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectButtonComponent } from './multi-select-button.component';

describe('MultiSelectButtonComponent', () => {
  let component: MultiSelectButtonComponent;
  let fixture: ComponentFixture<MultiSelectButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiSelectButtonComponent]
    });
    fixture = TestBed.createComponent(MultiSelectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
