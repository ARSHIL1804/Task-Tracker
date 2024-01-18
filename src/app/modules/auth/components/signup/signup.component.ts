import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { fieldValidator } from 'src/app/common/Utils/feildValidator';
import { isDefined, isNullOrUndefined, isEmpty } from 'src/app/common/Utils/utils';
import { API_CONTANTS } from 'src/app/common/constants/ApiConstants';
import { DIALOG_BUTTONS } from 'src/app/common/constants/AppEnums';
import { ERROR_ENUMS } from 'src/app/common/constants/ErrorEnums';
import { UserSignUpModel } from 'src/app/common/models/user-sign-up-model';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public userModel: UserSignUpModel = new UserSignUpModel();
  public userSignUpForm: FormGroup;
  public submitClicked:Boolean= false;
  
  constructor(
    private api:ApiService,
    private auth:AuthService,
    private router:Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ){
  }

  get f() { return this.userSignUpForm.controls; }

  public ngOnInit(){

    this.userSignUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,12}')]],
      confirmpassword: ['', [Validators.required]]
    },{
      validator: this
      .confirmPasswordValidator // Add the custom validator
    });
  }



  public  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmpassword');
  
    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  }
  public registerUser(){
    this.submitClicked = true;
    if(!this.userSignUpForm.invalid)
      this.userModel.userName = this.userModel.userName.trim();
      this.userModel.userEmail = this.userModel.userEmail.trim();
      this.userModel.userPassword = this.userModel.userPassword.trim();
      const {userConfirmPassword,...userData} = this.userModel;
      this.api
      .post(API_CONTANTS.USER_SIGN_UP,userData)
      .then(this.signupVerificationReceived.bind(this))
      .catch(
        (errprResponse)=>{
          switch (errprResponse.status){
            case ERROR_ENUMS.DUPLICATE_USER.errorCode:
              this.updateEmailValidator(true);
              break;
            case ERROR_ENUMS.SOMETHING_WRONG.errorCode:
                this.alertService.showDialog(
                  "Opps!! Something wrong happened. Please try again late",
                  ERROR_ENUMS.SOMETHING_WRONG.errorMessage,
                  [DIALOG_BUTTONS.OK]
                );
          }
        }
      )
  }

  public signupVerificationReceived(response){
    if(response.data.user && response.data.token){
      this.router.navigateByUrl('/tasks');
      this.auth.setSessionData("user", response.data.user);
      this.auth.setSessionData("token", response.data.token);
    }
  }

  updateEmailValidator(isAlreadyExist: boolean) {
    const emailControl = this.userSignUpForm.get('email');
    if (isAlreadyExist) {
      emailControl?.setValidators([
        Validators.required,
        Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        fieldValidator(isAlreadyExist)
      ]);
    } 
    else {
      emailControl?.setValidators(Validators.required);
    }
    emailControl?.updateValueAndValidity();
  }
}
