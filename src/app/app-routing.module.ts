import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { TasksComponent } from './modules/tasks/tasks.component';
import { AuthGuard } from './services/guard/auth-guard.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectsComponent } from './modules/projects/projects.component';
import { UserComponent } from './modules/user/user.component';


const routes : Routes = [
  {
    path:'auth',
    component:AuthComponent,
    loadChildren:()=>import('./modules/auth/auth.module').then(x=>x.AuthModule)
  },
  {
    path:'projects',
    component:ProjectsComponent,
    loadChildren:()=>import('./modules/projects/projects.module').then(x=>x.ProjectsModule),
    canActivate:[AuthGuard],
  },
  {
    path:'user-profile',
    component:UserComponent,
    loadChildren:()=>import('./modules/user/user.module').then(x=>x.UserModule),
    canActivate:[AuthGuard],
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }1
