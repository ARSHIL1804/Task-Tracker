import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_CONTANTS } from 'src/app/common/constants/ApiConstants';
import { ProjectModel } from 'src/app/common/models/project-model';
import { TasksListingComponent } from 'src/app/modules/tasks/components/tasks-listing/tasks-listing.component';
import { ApiService } from 'src/app/services/api.service';
import { TeamComponent } from '../team/team.component';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit{
  public project:ProjectModel = new ProjectModel();
  public showHeader :boolean=true ;
  public projectKey:String="";
  public lead:String="";


  constructor(
    private api:ApiService,
    private projectService:ProjectService,
    private route:ActivatedRoute
  ){
    this.projectKey =  this.route.snapshot.paramMap.get('projectKey');
    this.lead =  this.route.snapshot.paramMap.get('lead');
  }

  ngOnInit(): void {
    this.fetchProjectData();
  }


  async fetchProjectData(){
    this.project = await this.projectService.getProjectDetails(this.projectKey,this.lead);
  }

  onOutletLoaded(component) {
    component.projectKey = this.projectKey;
    component.lead = this.lead;
    if( component instanceof TasksListingComponent || component instanceof TeamComponent){
      this.showHeader = true;
    }
    else{
      this.showHeader = false;
    }
  }
}
