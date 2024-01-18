import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  constructor(private authService: AuthService){

  }
  list = [
    {
      number:'1',
      name:'PROJECTS',
      icon: 'fa-solid fa-diagram-project',
      path: '/projects'
    },
    {
      number:'1',
      name:'Profile',
      icon: 'fa-solid fa-user',
      path: '/user-profile'
    },

  ]

  logOut(){
    this.authService.logout();
  }
}
