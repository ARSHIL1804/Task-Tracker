import { Component, Input, OnInit } from '@angular/core';
import { USER_AVATAR } from '../../constants/AppEnums';
@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss']
})
export class ProfileIconComponent implements OnInit{
  @Input() avatar:USER_AVATAR;
  ngOnInit(): void {
    
  }
}
