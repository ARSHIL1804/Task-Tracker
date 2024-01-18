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
@Component({
  selector: 'app-tasks-listing',
  templateUrl: './tasks-listing.component.html',
  styleUrls: ['./tasks-listing.component.scss']
})
export class TasksListingComponent implements OnInit,AfterViewInit{
  public tasks: TaskListingModel[] = [];
  public searchText:string ='';
  public page:number = 1;
  public pageSize:number = 10;
  public totalCount:number =0;
  public selectedStatus = new FormControl('');
  public statusFilterList:number[]=[];
  public priorityFilterList:number[]=[];


  public TASK_STATUSES = STATUS_LIST;
  public TASK_PRIORITIES = PRIORITY_LIST;

  @Input() projectKey: String='';
  @Input() lead: String='';

  @ViewChild('searchInput') searchInput;

  constructor(
    private router:Router,
    private api:ApiService,
    private route:ActivatedRoute,
  ){

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.searchInput.valueChanges
                    .pipe(debounceTime(1000))
                    .pipe(distinctUntilChanged())
                    .subscribe(value=>{
                      this.tasks = [];
                      this.getTasks();
                    });
  }
  getTasks(isLoadMoreClicked=false){
    if(!isLoadMoreClicked)this.page=1;
    const filter = {
      'searchText':this.searchText,
      'pageIndex': this.page,
      'pageSize': this.pageSize,
      'statusFilter': this.statusFilterList,
      'priorityFilter': this.priorityFilterList,
      'projectKey': this.projectKey,
      'lead': this.lead
    }
    this.api
    .get(API_CONTANTS.GET_TASKS,filter)
    .then( (res:any) => {
      (res.data);
      if(isLoadMoreClicked){
        this.tasks.push(...res.data.tasks);
      }
      else{
       this.tasks= res.data.tasks;
      }
      this.totalCount = res.data.total;
    })
    .catch(err=>{
      (err);
    })

  }
  
  createTaskClicked(){
    const obj = {'projectKey':this.projectKey,'lead':this.lead}
    this.api
    .post(API_CONTANTS.CREATE_TASK,obj)
    .then( (res:any)=>{
      const task = res.data;
      (this.route)
      this.router.navigate([encodeURIComponent(task.name)],{
        relativeTo: this.route})
    })
    .catch(err=>{
    })
  }

  loadMoreClicked(){
    this.page++;
    this.getTasks(true);
  }

  statusFilterChange(event: any,status: any){
    event.stopPropagation();
    const index = this.statusFilterList.indexOf(status);
    if(index != -1){
      this.statusFilterList.splice(index,1);
    }
    else{
      this.statusFilterList.push(status);
    }
    this.getTasks();
  }

  getStatusText(status){
    return this.TASK_STATUSES.find(x=>x.id == status).value;
  }


  priorityFilterChange(event: any,status: any){
    event.stopPropagation();
    const index = this.priorityFilterList.indexOf(status);
    if(index != -1){
      this.priorityFilterList.splice(index,1);
    }
    else{
      this.priorityFilterList.push(status);
    }
    this.getTasks();
  }

  getPriorityText(status){
    return this.TASK_PRIORITIES.find(x=>x.id == status).value;
  }

}