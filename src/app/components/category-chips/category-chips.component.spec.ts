import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChipsComponent } from './category-chips.component';

describe('CategoryChipsComponent', () => {
  let component: CategoryChipsComponent;
  let fixture: ComponentFixture<CategoryChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryChipsComponent]
    });
    fixture = TestBed.createComponent(CategoryChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
