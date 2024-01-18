import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ProjectModel } from '../common/models/project-model';
import { API_CONTANTS } from '../common/constants/ApiConstants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  project : ProjectModel ; 
  constructor(private api:ApiService,
    private auth:AuthService) { }


  getProjectDetails(projectKey,lead){
    return this.project ? this.project : 
    this.api.get(
      API_CONTANTS.GET_PROJECT,
      {'projectKey': projectKey,'lead': lead})
      .then((res:any) =>{
        this.project = res.data
        return this.project;
    })
  }

  isLeader(){
    if(this.auth.userDetails.value && this.project){
      return this.auth.userDetails.value.userGUID == this.project.lead.userGUID;
    }
  }
}
