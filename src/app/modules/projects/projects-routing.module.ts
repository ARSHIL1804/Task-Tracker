import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListingComponent } from './components/projects-listing/projects-listing.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectComponent } from './components/project/project.component';
import { TasksListingComponent } from '../tasks/components/tasks-listing/tasks-listing.component';
import { CreateTaskComponent } from '../tasks/components/create-task/create-task.component';
import { TeamComponent } from './components/team/team.component';

const routes : Routes = [
  {
    path:'',    
    component:ProjectsListingComponent,
  },
  {
    path:'create-project',    
    component:CreateProjectComponent,
  },
  {
    path:':lead/:projectKey',    
    component:ProjectComponent,
    children:[
      {
        path:'',    
        redirectTo:'tasks',
        pathMatch:'full'
      },
      {
        path:'tasks',
        children:[
          {
            path:'',
            component:TasksListingComponent,
          },
          {
            path:':taskName',
            component:CreateTaskComponent
          }
        ]
      },
      {
        path:'team',
        component:TeamComponent
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
