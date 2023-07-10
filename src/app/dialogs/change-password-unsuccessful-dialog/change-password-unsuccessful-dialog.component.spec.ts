import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordUnsuccessfulDialogComponent } from './change-password-unsuccessful-dialog.component';

describe('ChangePasswordUnsuccessfulDialogComponent', () => {
  let component: ChangePasswordUnsuccessfulDialogComponent;
  let fixture: ComponentFixture<ChangePasswordUnsuccessfulDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordUnsuccessfulDialogComponent]
    });
    fixture = TestBed.createComponent(ChangePasswordUnsuccessfulDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
