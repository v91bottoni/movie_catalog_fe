import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMovieSuccessfullDialogComponent } from './update-movie-successfull-dialog.component';

describe('UpdateMovieSuccessfullDialogComponent', () => {
  let component: UpdateMovieSuccessfullDialogComponent;
  let fixture: ComponentFixture<UpdateMovieSuccessfullDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMovieSuccessfullDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateMovieSuccessfullDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
