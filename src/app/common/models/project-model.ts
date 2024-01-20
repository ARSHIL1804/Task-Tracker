import { UserDetailsModel } from "./user-details-model";

export class ProjectModel{
    public name:string;
    public key:string;
    public description:string;
    public projectGUID:string;
    public lead:UserDetailsModel
    public members:[UserDetailsModel];
    public totalMembers:number;
    public totalTasks:number;
    public completedTasks:number;



    constructor(){
        this.name = '';
        this.key = '';
        this.description = '';
        this.projectGUID='';
        this.totalMembers=0;
    }
}