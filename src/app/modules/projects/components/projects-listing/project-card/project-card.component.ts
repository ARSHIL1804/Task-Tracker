import { Component, EventEmitter, Input, Output } from '@angular/core';
import { API_CONTANTS } from 'src/app/common/constants/ApiConstants';
import { DIALOG_BUTTONS } from 'src/app/common/constants/AppEnums';
import { ProjectModel } from 'src/app/common/models/project-model';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Output() deleteProject: EventEmitter<any> = new EventEmitter();
   constructor(
    private alertService: AlertService,
    private apiService:ApiService
   ){

   }
   @Input() project:ProjectModel;


   deleteProjectClicked(lead,projectKey){
    this.deleteProject.emit([lead,projectKey]);
   }

}
