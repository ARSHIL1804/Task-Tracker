import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListingComponent } from './projects-listing.component';

describe('ProjectsListingComponent', () => {
  let component: ProjectsListingComponent;
  let fixture: ComponentFixture<ProjectsListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsListingComponent]
    });
    fixture = TestBed.createComponent(ProjectsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
