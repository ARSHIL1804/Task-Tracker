import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { API_CONTANTS } from 'src/app/common/constants/ApiConstants';
import { ERROR_ENUMS } from 'src/app/common/constants/ErrorEnums';
import { UserDetailsModel } from 'src/app/common/models/user-details-model';
import { ApiService } from 'src/app/services/api.service';
import { fieldValidator } from 'src/app/common/Utils/feildValidator';
import { AlertService } from 'src/app/services/alert.service';
import { DIALOG_BUTTONS} from 'src/app/common/constants/AppEnums';
import { AuthService } from 'src/app/services/auth.service';
import { USER_AVATAR } from 'src/app/common/constants/AppConstants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public userDetailsCopy :UserDetailsModel = new UserDetailsModel();
  public userDetails :UserDetailsModel = new UserDetailsModel();

  public userDetailsForm:FormGroup;
  public saveButtonEnabled: boolean= false;

  public saveClicked: boolean = false;
  public ERROR_ENUMS = ERROR_ENUMS;
  public avatars = USER_AVATAR;

  constructor(
    private api:ApiService,
    private formBuilder:FormBuilder,
    private alertService: AlertService,
    private authService:AuthService
  ){
    this.userDetailsForm = this.formBuilder.group({
      email: ['', [Validators .required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      name: ['', [Validators.required]],
      avatar: [null],
    });

    this.userDetailsForm.valueChanges.subscribe(() => {
      this.saveButtonEnabled = this.userDetailsForm.dirty;
    });
  }

  ngOnInit(){
    this.authService.userDetails.subscribe((userData)=>{
      if(userData){
        this.userDetails = {...userData};
        this.userDetailsCopy = {...userData};
      }
    })
  }

  get f() { return this.userDetailsForm.controls; }

  
  updateEmailValidator(isAlreadyExist: boolean) {
    const emailControl = this.userDetailsForm.get('email');
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

  public saveUserDetails(){
    this.saveClicked = true;
    if(!this.userDetailsForm.invalid)
      this.userDetails.userName = this.userDetails.userName.trim();
      this.userDetails.userEmail = this.userDetails.userEmail.trim();
      this.api
      .post(API_CONTANTS.SAVE_USER_INFO,this.userDetails)
      .then(this.savedVerificationRecieved.bind(this))
      .catch(
        (errprResponse)=>{
          switch (errprResponse.status){
            case ERROR_ENUMS.DUPLICATE_USER.errorCode:
              this.updateEmailValidator(true);
              break;
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

  savedVerificationRecieved() {
    this.alertService.showDialog(
      "User data saved successfully",
      'Sucess',
      [DIALOG_BUTTONS.OK]
    );
  }

  emailChange(){
    this.updateEmailValidator(false);
  }

  selectAvatar(avatar){
    this.userDetails.avatar = avatar;
    if(this.userDetails.avatar !== this.userDetailsCopy.avatar){
      this.saveButtonEnabled = true;
    }
  }
}

