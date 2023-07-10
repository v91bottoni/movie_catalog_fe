import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordSuccessfulDialogComponent } from './forgot-password-successful-dialog.component';

describe('ForgotPasswordSuccessfulDialogComponent', () => {
  let component: ForgotPasswordSuccessfulDialogComponent;
  let fixture: ComponentFixture<ForgotPasswordSuccessfulDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordSuccessfulDialogComponent]
    });
    fixture = TestBed.createComponent(ForgotPasswordSuccessfulDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
