import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input  } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { API_CONTANTS } from 'src/app/common/constants/ApiConstants';
import { PRIORITY, STATUS, USER_AVATAR } from 'src/app/common/constants/AppEnums';
import { TaskModel } from 'src/app/common/models/task-model';
import { UserDetailsModel } from 'src/app/common/models/user-details-model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import tinymce from 'tinymce';
import { EDITOR_CONFIG, STATUS_CSS_CLASS, STATUS_TRANSITIONS } from 'src/app/common/constants/AppConstants';
import { isEmpty } from 'src/app/common/Utils/utils';
import { Subject } from 'rxjs';
interface TeamMember{
  userName: String;
  userGUID:String;
};
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})

export class CreateTaskComponent implements OnInit,AfterViewInit {
  public taskObservable: Subject<UserDetailsModel> = new Subject();
  public taskModel: TaskModel = new TaskModel();
  public isEdit: boolean = false;
  public taskName:string ='';
  public user: UserDetailsModel = new UserDetailsModel();
  public PRIORITIES = PRIORITY;
  public STATUS = STATUS;
  public transitions:any;
  public status_css_class:string;
  public isDescriptionFocued:boolean = false;
  public isCommendtInputFocused:boolean = false;
  public commentInputString: string='';
  public teamMembers:[TeamMember];
  
  @Input() projectKey: String='';
  @Input() lead: String='';

  @ViewChild('statusMenuTrigger', { static: false }) statusMenuTrigger: MatMenuTrigger;
  @ViewChild('descritpion', { static: false }) descritpion: ElementRef;
  @ViewChild('comment', { static: false }) comment: ElementRef;


  
  debounce: any;
  editorConfig= EDITOR_CONFIG;

  constructor(
    private api:ApiService,
    private route: ActivatedRoute,
    private authService:AuthService
    ){
    
  }

  ngOnInit(): void {
    this.taskName = this.route.snapshot.paramMap.get('taskName');
    this.changePossibleTransition.bind(this);

    this.fetchTask();
    this.getTeamMembers();
    this.status_css_class = STATUS_CSS_CLASS[this.taskModel.status];
    this.authService.userDetails.subscribe(data=>{
      if(data){
        this.user = data;
      }
    });

    this.taskObservable.subscribe(task=>{
      this.onTaskDataReceived(task);
    })
  }

  ngAfterViewInit(){
  }

  onTaskDataReceived(task: any){
    this.taskModel = task;
    if(!isEmpty(this.taskModel.description)){
      (this.taskModel.description)
      this.descritpion.nativeElement.innerHTML = this.taskModel.description;
    } 
    this.changePossibleTransition(this.taskModel.status);
  }

  fetchTask(){
    this.api.
    get(API_CONTANTS.GET_TASK,{taskName:this.taskName,projectKey:this.projectKey,lead:this.lead})
    .then( (res:any) => {
      this.taskObservable.next(res.data);
    })
    .catch((error:any)=>{
      
    })
  }

  saveTask(key:string, value:any, callback=null,params=null){
    this.api
    .post(API_CONTANTS.SAVE_TASK,{task : {'name':this.taskModel.name}, key,value,projectKey:this.projectKey,lead:this.lead})
    .then(res=>{
      if(callback)
      { 
        callback(params);
      }
    })
  }

  onTaskNameChange(event: Event){
    clearInterval(this.debounce);
    this.debounce = setTimeout(()=>{
      this.validateName(event);
    },1000)
  }

  validateName(event:Event){
    let newTaskName = (event.target as HTMLInputElement).value;
    if(!(newTaskName.length == 0 || newTaskName.length > 255)){
      this.taskModel.title = (event.target as HTMLInputElement).value.trim();
    }
    (event.target as HTMLInputElement).value = this.taskModel.title;
    this.saveTask('title',this.taskModel.title);
  }

  changePossibleTransition = (newStatus) =>{
    this.taskModel.status = newStatus;
    this.transitions = STATUS_TRANSITIONS[this.taskModel.status];
    this.status_css_class = STATUS_CSS_CLASS[this.taskModel.status];
  }

  onStatusChange(newStatus){
    this.saveTask('status',newStatus,this.changePossibleTransition,newStatus);
  }
  onPriorityChange(newPriority){
    this.taskModel.priority = newPriority;
    this.saveTask('priority',newPriority);
  }

  //Description Functions
  saveDescription(){
    if(tinymce.activeEditor){
      const editor = tinymce.activeEditor;
      this.taskModel.description = editor.getContent();
      if(this.taskModel.description === ''){
        editor.setContent('Add a description...')
      }
      tinymce.remove(tinymce.activeEditor);
    }
    this.isDescriptionFocued = false;
    this.saveTask('description',this.taskModel.description);
  }

  cancleDescription(){
    if(tinymce.activeEditor){
      const editor = tinymce.activeEditor;
      if(this.taskModel.description === ''){
        editor.setContent('Add a description...')
      }
      else{
        editor.setContent(this.taskModel.description);
      }
      tinymce.remove(tinymce.activeEditor);
    }
    this.isDescriptionFocued = false;
  }

  editDesritpion(){
    !this.isDescriptionFocued && this.closeAllOtherEditor();
    tinymce.init({
      target: this.descritpion.nativeElement,
      selector:'.description',
      base_url: '/tinymce',
      menubar: false,
      toolbar: 'undo redo | blocks | image',
      setup: editor => {
        editor.on('init', (e) => {
          this.isDescriptionFocued = true;
          editor.setContent(this.taskModel.description);
        })
        editor.on('blur', (e) => {
        });
      }
    });
  }

  //Comment Functions
  postComment(commentString:String){
    this.api
    .post(API_CONTANTS.POST_COMMENT,{taskName:this.taskModel.name,projectKey:this.projectKey,lead:this.lead,commentString})
    .then((res :any)=>{
      this.taskModel.comments = res.data[0]?.comments;
    })
  }

  saveComment(){
    if(this.commentInputString !== ''){
      this.postComment(this.commentInputString);
    }
    this.comment.nativeElement.value='';
    this.comment.nativeElement.blur();
    this.isCommendtInputFocused = false;
  }

  cancleComment(){
    this.comment.nativeElement.value=this.commentInputString;
    this.comment.nativeElement.blur();
    this.isCommendtInputFocused = false;
  }

  editComment(){
    this.isCommendtInputFocused = true;
  }

  deleteComment(commentGUID){
    this.api
    .post(API_CONTANTS.DELETE_COMMENT,{taskName:this.taskModel.name,projectKey:this.projectKey,lead:this.lead,commentGUID:commentGUID})
    .then((res :any)=>{
      this.taskModel.comments = res.data[0]?.comments;
    })
  }

  closeAllOtherEditor(){
    if(tinymce.activeEditor){
      tinymce.remove(tinymce.activeEditor);
    }
  }

  getTeamMembers(){
    this.api
    .get(API_CONTANTS.GET_TEAM_MEMBERS_NAME,{projectKey:this.projectKey,lead:this.lead})
    .then((res :any)=>{
      this.teamMembers = res.data.members;
    })
  }

  onAssigneeChange(user){
    this.taskModel.assignee = user;

    this.api
    .post(API_CONTANTS.CHANGE_ASSIGNEE,{taskName:this.taskModel.name,projectKey:this.projectKey,lead:this.lead,assignee:user.userGUID})
    .then((res :any)=>{
      
    })
  }
  ngOnDestroy() :void{

  }
  
}