interface UserInfo {
    userName: String;
    userEmail:String;
    userGUID: String;
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