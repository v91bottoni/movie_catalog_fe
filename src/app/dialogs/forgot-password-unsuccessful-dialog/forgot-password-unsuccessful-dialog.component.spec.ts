import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordUnsuccessfulDialogComponent } from './forgot-password-unsuccessful-dialog.component';

describe('ForgotPasswordUnsuccessfulDialogComponent', () => {
  let component: ForgotPasswordUnsuccessfulDialogComponent;
  let fixture: ComponentFixture<ForgotPasswordUnsuccessfulDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordUnsuccessfulDialogComponent]
    });
    fixture = TestBed.createComponent(ForgotPasswordUnsuccessfulDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
