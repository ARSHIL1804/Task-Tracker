import { NONE_TYPE } from "@angular/compiler";
import { PRIORITY, STATUS } from "../constants/AppEnums";
import { UserDetailsModel } from "./user-details-model";
import { CommentModel } from "./comment-model";

export class TaskModel{
    public name:string;
    public nameId:number;
    public title:string;
    public description: string;
    public priority:PRIORITY
    public attachments: string[];
    public linkedTasks: TaskModel[];
    public createdAt: Date;
    public createdBy: UserDetailsModel;
    public assignee: UserDetailsModel;
    public updatedAt: Date;
    public updatedBy: UserDetailsModel;
    public status: STATUS;
    public labels: string;
    public comments: CommentModel[];

    constructor(){
        this.title = 'Untitle';
        this.description = '';
        this.priority = PRIORITY.MEDIUM;
        this.status = STATUS.TODO;
        this.comments = [];
    }
}