import { NONE_TYPE } from "@angular/compiler";
import { PRIORITY, STATUS } from "../constants/AppEnums";
import { UserDetailsModel } from "./user-details-model";
import { TaskModel } from "./task-model";

export class CommentModel{
    public commentGUID:string;
    public commentString:string;
    public postBy: UserDetailsModel;
    

    public createdAt: Date;
    public updatedAt: Date;


    constructor(commentString,user){
        this.commentString = commentString;
        this.postBy = user
    }
}