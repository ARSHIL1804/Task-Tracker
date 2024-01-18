import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  public showSubmenu = true;
  public isExpanded = true;
  public showSubSubMenu = true;
  public isShowing = true;
}
