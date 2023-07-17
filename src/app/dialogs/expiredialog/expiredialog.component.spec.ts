import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredialogComponent } from './expiredialog.component';

describe('ExpiredialogComponent', () => {
  let component: ExpiredialogComponent;
  let fixture: ComponentFixture<ExpiredialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpiredialogComponent]
    });
    fixture = TestBed.createComponent(ExpiredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
