import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrowerButtonComponent } from './drower-button.component';

describe('DrowerButtonComponent', () => {
  let component: DrowerButtonComponent;
  let fixture: ComponentFixture<DrowerButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrowerButtonComponent]
    });
    fixture = TestBed.createComponent(DrowerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
