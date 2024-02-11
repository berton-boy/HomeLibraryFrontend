import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEventTableComponent } from './book-event-table.component';

describe('BookEventTableComponent', () => {
  let component: BookEventTableComponent;
  let fixture: ComponentFixture<BookEventTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookEventTableComponent]
    });
    fixture = TestBed.createComponent(BookEventTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
