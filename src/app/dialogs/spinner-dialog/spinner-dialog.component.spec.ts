import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerDialogComponent } from './spinner-dialog.component';

describe('SpinnerDialogComponent', () => {
  let component: SpinnerDialogComponent;
  let fixture: ComponentFixture<SpinnerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerDialogComponent]
    });
    fixture = TestBed.createComponent(SpinnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
