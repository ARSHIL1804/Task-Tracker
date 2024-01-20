import { USER_AVATAR } from "../constants/AppEnums";

interface UserInfo {
    userName: String;
    userEmail:String;
    userGUID: String;
    avatar:USER_AVATAR;
}
interface TaskInfo {
    inProgressTasks:number;
    completedTasks:number;
    totalTasks:number;
};


export class TeamMemberModel{
    user:UserInfo;
    taskData:TaskInfo;
}