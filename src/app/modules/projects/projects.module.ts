import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListingComponent } from './components/projects-listing/projects-listing.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

import { ProjectsComponent } from './projects.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './components/project/project.component';
import { TasksModule } from '../tasks/tasks.module';
import { TeamComponent } from './components/team/team.component';
import { MatMenuModule } from '@angular/material/menu';
import { MemberCardComponent } from './components/team/member-card/member-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProjectCardComponent } from './components/projects-listing/project-card/project-card.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProfileIconComponent } from 'src/app/common/components/profile-icon/profile-icon.component';
@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsListingComponent,
    CreateProjectComponent,
    ProjectComponent,
    TeamComponent,
    MemberCardComponent,
    ProjectCardComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    TasksModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCheckboxModule,
    MatProgressBarModule
  ]
})
export class ProjectsModule { }
