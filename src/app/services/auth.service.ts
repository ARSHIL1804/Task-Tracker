import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { API_CONTANTS } from '../common/constants/ApiConstants';
import { AlertService } from './alert.service';
import { UserDetailsModel } from '../common/models/user-details-model';
import { DIALOG_BUTTONS } from '../common/constants/AppEnums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userDetails: BehaviorSubject<UserDetailsModel | null> = new BehaviorSubject(null);
  

  constructor(
    private api: ApiService,
    private alertSerice: AlertService,
    private router: Router) {
      this.api.logOutSubject.subscribe( (value)=>{
        if(value){
          this.logout();
        }
      })
  }

  public setSessionData(key, value) {
    if (typeof value === 'object') {
      const jsonString = JSON.stringify(value);
      window.localStorage.setItem(key, jsonString);
    } else {
      window.localStorage.setItem(key, value);
    }
  }

  public isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  public logout() {
    if (this.isLoggedIn) {
      this.api
        .post(API_CONTANTS.LOG_OUT)
        .then((res: any) => {
          if (res.statusCode == 200) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            this.router.navigateByUrl('/auth/login');
          }
        })
    }
  }

  public handleSessionExpiration() {
    this.alertSerice.showDialog(
      'Your Session Has Been Expired. Please Login Again',
      'Session Expired',
      [DIALOG_BUTTONS.OK],
      true
    ).afterClosed().subscribe(res => {
        this.logout()
    })
  }

  public fetchUserDetails(): any {
    if (!this.getUserData()) {
      this.api.get(API_CONTANTS.GET_USER)
      .then((res: any) => {
        this.userDetails.next(res.data);
      })
      .catch(err => {
      });
    }
  }

  public getUserData() {
    return this.userDetails.value;
  }
}
