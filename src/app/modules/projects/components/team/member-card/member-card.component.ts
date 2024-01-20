import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamMemberModel } from 'src/app/common/models/team-member-model';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit{

  @Input() public data:TeamMemberModel;
  constructor(
    public route:ActivatedRoute
  ){
    
  }
  ngOnInit(){
  }

  getProgress(){
    if(this.data?.taskData?.totalTasks != 0){
      return (this.data?.taskData?.completedTasks/this.data?.taskData?.totalTasks) * 100;
    }
    return 100;
  }
}
