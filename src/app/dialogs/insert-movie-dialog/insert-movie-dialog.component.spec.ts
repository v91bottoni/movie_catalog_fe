import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMovieDialogComponent } from './insert-movie-dialog.component';

describe('InsertMovieDialogComponent', () => {
  let component: InsertMovieDialogComponent;
  let fixture: ComponentFixture<InsertMovieDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertMovieDialogComponent]
    });
    fixture = TestBed.createComponent(InsertMovieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
