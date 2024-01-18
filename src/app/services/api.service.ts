import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject, lastValueFrom} from 'rxjs';
import { ERROR_ENUMS } from '../common/constants/ErrorEnums';
import { AlertService } from './alert.service';
import { DIALOG_BUTTONS } from '../common/constants/AppEnums';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  public logOutSubject: Subject<Boolean | null> = new Subject();

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    ) { 
    
  }

  public async post(
    endPoint: string,
    object: any = null,
  ){
    let token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'authorization': `${token}`,
      'Content-Type': 'application/json',
    });
    
    const observable = this.http.post(endPoint, object, {
      headers: headers,
      withCredentials:true
    });
    return new Promise((resolve, reject) => {
      observable.subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          this.errorHandler(error,reject);
        }
      );
    });
  
  }

  public async get(
    endPoint: string,
    object: any = null,
  ){
    let token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'authorization': `${token}`,
      'Content-Type': 'application/json',
    });
    const observable = this.http.get(endPoint, {
      headers: headers,
      withCredentials:true,
      params: object
    });
    return new Promise((resolve, reject) => {
      observable.subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          this.errorHandler(error,reject);
        }
      );
    });
  }

  public errorHandler(error:any,errorCallback:any){
    switch (error.status){
      case ERROR_ENUMS.SOMETHING_WRONG.errorCode:
          this.alertService.showDialog(
            "Opps!! Something wrong happened. Please try again late",
            ERROR_ENUMS.SOMETHING_WRONG.errorMessage,
            [DIALOG_BUTTONS.OK]
          );
          break;
      case ERROR_ENUMS.SESSION_EXPIRED.errorCode:
        this.alertService.showDialog(
          'Your session has been expired. please login again',
          'Session Expired',
          [DIALOG_BUTTONS.OK],
          true
        ).afterClosed().subscribe(res => {
          this.logOutSubject.next(true);
        });
        break;
      default:
        errorCallback(error);
        break;
    }

  }
  
}
