import { NONE_TYPE } from "@angular/compiler";
import { PRIORITY, STATUS } from "../constants/AppEnums";
import { UserDetailsModel } from "./user-details-model";
import { CommentModel } from "./comment-model";

export class TaskListingModel{
    public name:string;
    public title:string;
    public priority:PRIORITY
    public createdBy: UserDetailsModel;
    public assignee: UserDetailsModel;
    public status: STATUS;
    public labels: string;
}