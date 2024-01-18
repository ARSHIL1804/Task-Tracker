import { Component, OnInit } from '@angular/core';
import { UserLoginModel } from 'src/app/common/models/user-login-model';
import { AuthService } from "src/app/services/auth.service";
import { ApiService } from "src/app/services/api.service";
import { API_CONTANTS } from 'src/app/common/constants/ApiConstants';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ERROR_ENUMS } from 'src/app/common/constants/ErrorEnums';
import { AlertService } from 'src/app/services/alert.service';
import { fieldValidator } from 'src/app/common/Utils/feildValidator';
import { DIALOG_BUTTONS } from 'src/app/common/constants/AppEnums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public userLoginModel : UserLoginModel = new UserLoginModel();
  public userLoginForm:FormGroup;
  public submitClicked:boolean= false;
  public wrongPassword:boolean = false;
  public ERROR_ENUMS = ERROR_ENUMS;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ){
    this.userLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,fieldValidator(this.wrongPassword)]],
    },{});
  }


  ngOnInit(){

  }

  get f() { return this.userLoginForm.controls; }

  loginUser(){
    this.submitClicked = true;
    this.updateEmailValidator(false)
    this.updatePasswordValidator(false)

    if(!this.userLoginForm.invalid){
      this.userLoginModel.userEmail = this.userLoginModel.userEmail.trim();
      this.userLoginModel.userPassword = this.userLoginModel.userPassword.trim();
      this.api
      .post(API_CONTANTS.USER_LOG_IN,this.userLoginModel)
      .then((response:any)=>{
        this.router.navigateByUrl('/projects');
        this.auth.setSessionData("user", response.data.user);
        this.auth.setSessionData("token", response.data.token);
      })
      .catch(err=>{
        switch(err.status){
          case ERROR_ENUMS.USER_NOT_FOUND.errorCode:
            this.updateEmailValidator(true);
            break;
          case ERROR_ENUMS.PASS_WRONG.errorCode:
            this.updatePasswordValidator(true);
            break;
          case ERROR_ENUMS.SOMETHING_WRONG.errorCode:
            this.alertService.showDialog(
              "Opps!! Something wrong happened. Please try again late",
              ERROR_ENUMS.SOMETHING_WRONG.errorMessage,
              [DIALOG_BUTTONS.OK]
            )
        }
      })
    }
  }

  updatePasswordValidator(isWrong: boolean) {
    const passwordControl = this.userLoginForm.get('password');
    if (isWrong) {
      passwordControl?.setValidators([
        Validators.required,
        fieldValidator(isWrong)
      ]);
    } 
    else {
      passwordControl?.setValidators(Validators.required);
    }
    passwordControl?.updateValueAndValidity();
  }

  updateEmailValidator(isAvailable: boolean) {
    const emailControl = this.userLoginForm.get('email');
    if (isAvailable) {
      emailControl?.setValidators([
        Validators.required,
        Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        fieldValidator(isAvailable)
      ]);
    } 
    else {
      emailControl?.setValidators(Validators.required);
    }
    emailControl?.updateValueAndValidity();
  }

  passwordChange(){
    this.updatePasswordValidator(false)
  }
  emailChange(){
    this.updateEmailValidator(false);
  }
}
