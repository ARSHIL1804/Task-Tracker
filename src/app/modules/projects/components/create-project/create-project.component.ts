import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProjectModel } from 'src/app/common/models/project-model';
import { ERROR_ENUMS } from 'src/app/common/constants/ErrorEnums';
import { ApiService } from 'src/app/services/api.service';
import { API_CONTANTS } from 'src/app/common/constants/ApiConstants';
import { fieldValidator } from 'src/app/common/Utils/feildValidator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit{
  public PROJECT_IMAGES=['assets/images/project/image1.png','assets/images/project/image2.png','assets/images/project/image3.png'];
  public projectForm:FormGroup;
  public projectModel: ProjectModel =  new ProjectModel();
  public submitClicked:boolean = false;
  public ERROR_ENUMS = ERROR_ENUMS;
  public currentImage:number = 0;
  get f() { return this.projectForm.controls; }


  constructor(
    private formBuilder: FormBuilder,
    private api:ApiService,
    private router:Router
  ){
    this.projectForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.pattern('^[a-zA-Z].*$')]],
      key: ['',[Validators.required, Validators.pattern('^[A-Z][A-Z0-9]*$')]],
      description: ['']
    },{});
  }

  ngOnInit(): void {
    this.setImageSlideShow();
  }

  setImageSlideShow(){
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % (this.PROJECT_IMAGES.length);
    }, 5000);
  }

  updateNameValidator(isAvailable: boolean) {
    const nameControl = this.projectForm.get('name');
    if (isAvailable) {
      nameControl?.setValidators([
        Validators.required, 
        Validators.pattern('^[a-zA-Z].*$'),
        fieldValidator(isAvailable)
      ]);
    } 
    else {
      nameControl?.setValidators([Validators.required,Validators.pattern('^[a-zA-Z].*$')]);
    }
    nameControl?.updateValueAndValidity();
  }

  updateKeyValidator(isAvailable: boolean) {
    const keyControl = this.projectForm.get('key');
    if (isAvailable) {
      keyControl?.setValidators([
        Validators.required, 
        Validators.pattern('^[A-Z][A-Z0-9]*$'),
        fieldValidator(isAvailable)
      ]);
    } 
    else {
      keyControl?.setValidators([Validators.required,Validators.pattern('^[A-Z][A-Z0-9]*$')]);
    }
    keyControl?.updateValueAndValidity();
  }
  createProject(){
      this.submitClicked = true;
      this.updateNameValidator(false);
      this.updateKeyValidator(false);


      if(!this.projectForm.invalid){
        this.projectModel.name = this.projectModel.name.trim();
        this.projectModel.key = this.projectModel.key.trim();
        this.projectModel.description = this.projectModel.description.trim();

        this.api
        .post(API_CONTANTS.CREATE_PROJECT,this.projectModel)
        .then((response:any)=>{
          const lead = response.data.lead;
          this.router.navigate(['/projects',encodeURIComponent(lead.userName),encodeURIComponent(response.data.key),'tasks']);
        })
        .catch(err=>{
          switch(err.status){
            case ERROR_ENUMS.DUPLICATE_PROJECT_NAME.errorCode:
              this.updateNameValidator(true);
              break;
            case ERROR_ENUMS.DUPLICATE_PROJECT_KEY .errorCode:
              this.updateKeyValidator(true);
              break;
            case ERROR_ENUMS.SOMETHING_WRONG.errorCode:

          }
          (err);
        })
      }
  }

}
