import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListingComponent } from './tasks-listing.component';

describe('TasksListingComponent', () => {
  let component: TasksListingComponent;
  let fixture: ComponentFixture<TasksListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListingComponent]
    });
    fixture = TestBed.createComponent(TasksListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
