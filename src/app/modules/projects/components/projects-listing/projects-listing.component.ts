import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_CONTANTS } from 'src/app/common/constants/ApiConstants';
import { DIALOG_BUTTONS } from 'src/app/common/constants/AppEnums';
import { ProjectModel } from 'src/app/common/models/project-model';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-projects-listing',
  templateUrl: './projects-listing.component.html',
  styleUrls: ['./projects-listing.component.scss']
})
export class ProjectsListingComponent implements OnInit {
  public searchText:string="";
  public projects:[ProjectModel];
  public displayedColumns: string[] = ['position', 'key','name', 'lead','members'];
  constructor(
    private router:Router,
    private api: ApiService,
    private alert:AlertService){

  }

  ngOnInit(): void {
    this.fetchProjects();
  }


  fetchProjects(){
    this.api.get(API_CONTANTS.GET_PROJECTS)
    .then((res:any)=>{
      this.projects = res.data;
    })
  }

  createPorjectClicked(){
    this.router.navigate(['/projects/create-project']);
  }

  deleteProject(lead, projectKey){
    this.alert.showDialog('All the tasks unders this program will be deleted!!','Alert!',[DIALOG_BUTTONS.OK,DIALOG_BUTTONS.CANCLE])
    .afterClosed().subscribe((res)=>{
      if(res){
        this.api.post(API_CONTANTS.DELETE_PROJECT,{lead,projectKey})
        .then((res:any)=>{
          this.projects = res.data;
        })
      }
      else{

      }
    })

   }
}
