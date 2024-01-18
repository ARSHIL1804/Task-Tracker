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
}
