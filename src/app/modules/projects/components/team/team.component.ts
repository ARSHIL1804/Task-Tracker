import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { API_CONTANTS } from 'src/app/common/constants/ApiConstants';
import { TaskListingModel } from 'src/app/common/models/task-listing-model';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import {FormControl} from '@angular/forms';
import { PRIORITY_LIST, STATUS_LIST } from 'src/app/common/constants/AppConstants';
import { UserDetailsModel } from 'src/app/common/models/user-details-model';
import { TeamMemberModel } from 'src/app/common/models/team-member-model';
import { ERROR_ENUMS } from 'src/app/common/constants/ErrorEnums';
import { DIALOG_BUTTONS } from 'src/app/common/constants/AppEnums';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit{
  public team: TeamMemberModel[] = [];
  public totalCount:number = 0;
  public newMemberEmail:string = '';

  @Input() projectKey: String='';
  @Input() lead: String='';

  @ViewChild('memberEmailInput') memberEmailInput;

  constructor(
    private api:ApiService,
    private alert:AlertService,
    public projectService:ProjectService
  ){

  }
  ngOnInit(): void {
    this.getTeam();
  }
  getTeam(){
    const filter = {
      'projectKey': this.projectKey,
      'lead': this.lead
    }
    this.api
    .get(API_CONTANTS.GET_TEAM,filter)
    .then( (res:any) => {
      this.team = res.data;
      this.totalCount = res.data.length;
    })
    .catch(err=>{
    })

  }

  
  addNewMemeber(){
    const filter = {
      'projectKey': this.projectKey,
      'lead': this.lead
    }
    this.api
    .post(API_CONTANTS.ADD_MEMBER,{filter,email:this.newMemberEmail})
    .then( (res:any) => {
    
    })
    .catch(err=>{
      if(err.status === ERROR_ENUMS.DUPLICATE_USER.errorCode){
        this.alert.showDialog("The user already exists in the team.",'Alert!',[DIALOG_BUTTONS.OK])
      }
      else if(err.status === ERROR_ENUMS.USER_NOT_FOUND.errorCode){
        this.alert.showDialog('The user not found in system','Alert!',[DIALOG_BUTTONS.OK])
      }
    })
  }



}