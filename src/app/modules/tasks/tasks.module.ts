import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { DrawerComponent } from 'src/app/common/components/drawer/drawer.component';
import { TasksListingComponent } from './components/tasks-listing/tasks-listing.component';
import { TaskCardComponent } from './components/tasks-listing/task-card/task-card.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ProfileIconComponent } from 'src/app/common/components/profile-icon/profile-icon.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [
    TasksComponent,
    TasksListingComponent,
    TaskCardComponent,
    CreateTaskComponent,
    ProfileIconComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class TasksModule { }
