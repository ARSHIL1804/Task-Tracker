import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { STATUS_CSS_CLASS } from 'src/app/common/constants/AppConstants';
import { PRIORITY, STATUS } from 'src/app/common/constants/AppEnums';
import { TaskListingModel } from 'src/app/common/models/task-listing-model';
import { TaskModel } from 'src/app/common/models/task-model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})

export class TaskCardComponent implements OnInit{
  public PRIORITIES = PRIORITY;
  public STATUS = STATUS;
  public STATUS_CSS_CLASS=STATUS_CSS_CLASS;

  @Input() public task :TaskListingModel;
  constructor(
    public route:ActivatedRoute
  ){
    
  }
  ngOnInit(){
  }
}
