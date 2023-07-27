import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectDialogComponent } from './multi-select-dialog.component';

describe('MultiSelectDialogComponent', () => {
  let component: MultiSelectDialogComponent;
  let fixture: ComponentFixture<MultiSelectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiSelectDialogComponent]
    });
    fixture = TestBed.createComponent(MultiSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
