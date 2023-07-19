import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordSuccessfulDialogComponent } from './change-password-successful-dialog.component';

describe('ChangePasswordSuccessfulDialogComponent', () => {
  let component: ChangePasswordSuccessfulDialogComponent;
  let fixture: ComponentFixture<ChangePasswordSuccessfulDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordSuccessfulDialogComponent]
    });
    fixture = TestBed.createComponent(ChangePasswordSuccessfulDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
