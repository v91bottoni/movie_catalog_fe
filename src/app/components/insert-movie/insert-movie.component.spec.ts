import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMovieComponent } from './insert-movie.component';

describe('InsertMovieComponent', () => {
  let component: InsertMovieComponent;
  let fixture: ComponentFixture<InsertMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertMovieComponent]
    });
    fixture = TestBed.createComponent(InsertMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
