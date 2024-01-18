import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListingComponent } from './components/tasks-listing/tasks-listing.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

const routes: Routes = [
  {
    path:'',
    component:TasksListingComponent,
  },
  {
    path:':taskName',
    component:CreateTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
