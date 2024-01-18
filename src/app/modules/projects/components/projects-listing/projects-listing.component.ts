import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_CONTANTS } from 'src/app/common/constants/ApiConstants';
import { ProjectModel } from 'src/app/common/models/project-model';
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
  constructor(private router:Router,
  private api: ApiService){

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
}
