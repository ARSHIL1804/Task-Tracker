const { DUPLICATE_PROJECT_NAME, DUPLICATE_PROJECT_KEY, SOMETHING_WRONG, PROJECT_NOT_FOUND, USER_NOT_FOUND, DUPLICATE_USER } = require("../constants/ErrorEnums");
const { COLUMN_FILTERS, TASK_LISTING_COLUMNS } = require("../constants/FilterColumns");
const { HttpResponse } = require("../helpers/HttpResponse");
const { projectModel } = require("../models/ProjectModel");
const { userModel } = require("../models/User");

const { projectService } = require("../services/ProjectService");
const { taskService } = require("../services/TaskService");
class ProjectController {
    constructor(projectModel,projectService, taskService,userModel) {
        this.projectModel = projectModel;
        this.projectService = projectService;
        this.userModel = userModel;
        this.taskService = taskService;
    }


    createProject = async (req, res, next) => {
        try {
            const query ={
                $or:[
                    {name:req.body.name,lead:req.user._id},
                    {key:req.body.key,lead:req.user._id}
                ]
            }
            const projectExist = await this.projectModel.findOne(query);
            if(projectExist){
                if(projectExist.name === req.body.name){
                    const error = new Error(DUPLICATE_PROJECT_NAME.errorMessage);
                    error.statusCode = DUPLICATE_PROJECT_NAME.errorCode;
                    return next(error);
                }
                else if(projectExist.key === req.body.key){
                    const error = new Error(DUPLICATE_PROJECT_KEY.errorMessage);
                    error.statusCode = DUPLICATE_PROJECT_KEY.errorCode;
                    return next(error);
                }
            }
            const newProject = await this.projectModel.create({...req.body,lead:req.user._id,members:[req.user._id]});
            if(!newProject){
                throw 'error';
            }
            const project = await this.projectModel.findOne({projectGUID:newProject.projectGUID},COLUMN_FILTERS.COMMON).populate({path:'lead', select:'userName'});
            const httpRes = new HttpResponse(project);
            return res.status(httpRes.statusCode).json(httpRes);
        }
        catch (err) {
            const error = new Error(SOMETHING_WRONG.errorMessage);
            error.statusCode = SOMETHING_WRONG.errorCode;
            console.log(err)
            next(error);
        }
    }

    getProjects = async (req, res, next) => {
        try {
            let query = {
                members : {$elemMatch : {$eq:req.user._id}}
            }
            const projects = await this.projectModel.find(query,{name:1,key:1,lead:1,projectGUID:1,totalMembers:{$size:"$members"}}).populate({path:'lead',select:'userName userEmail avatar userGUID'});
            const httpRes = new HttpResponse(projects);
            return res.status(httpRes.statusCode).json(httpRes);
        }
        catch (err) {
            console.log(err)
            const error = new Error(SOMETHING_WRONG.errorMessage);
            error.statusCode = SOMETHING_WRONG.errorCode;
            next(error);
        }
    }

    getProject = async (req, res, next) =>{
        try {
            const userLead = await this.userModel.findOne({'userName':req.query.lead},'_id');
            const query ={
                'key':req.query.projectKey,
                'lead':userLead,
            }
            const project = await this.projectModel.findOne(query,COLUMN_FILTERS.COMMON).populate({path:'lead', select:COLUMN_FILTERS.COMMON});
            if(!project){
                const error = new Error(PROJECT_NOT_FOUND.errorMessage);
                error.statusCode = PROJECT_NOT_FOUND.errorCode;
                return next(error);
            }
            const httpRes = new HttpResponse(project);
            return res.status(httpRes.statusCode).json(httpRes);
        }
        catch (err) {
            const error = new Error(SOMETHING_WRONG.errorMessage);
            error.statusCode = SOMETHING_WRONG.errorCode;
            next(error);
        }
    }

    getTeamMembersName = async (req, res, next) =>{
        try {
            const projectId  = await this.projectService.getProjectId(req.query.projectKey, req.query.lead);
            if(!projectId){
                const error = new Error(PROJECT_NOT_FOUND.errorMessage);
                error.statusCode = PROJECT_NOT_FOUND.errorCode;
                return next(error);
            }
            const team = await this.projectModel.findOne({_id:projectId._id},{"_id":0,"members":1}).populate({path:'members', select:'userName userGUID'});

            const httpRes = new HttpResponse(team);
            return res.status(httpRes.statusCode).json(httpRes);
        }
        catch (err) {
            console.log(err);
            const error = new Error(SOMETHING_WRONG.errorMessage);
            error.statusCode = SOMETHING_WRONG.errorCode;
            next(error);
        }
    } 

    getTeamInfo = async (req, res, next) =>{
        try {
            const projectId  = await this.projectService.getProjectId(req.query.projectKey, req.query.lead);
            if(!projectId){
                const error = new Error(PROJECT_NOT_FOUND.errorMessage);
                error.statusCode = PROJECT_NOT_FOUND.errorCode;
                return next(error);
            }
            const team = await this.projectModel.findOne({_id:projectId._id},{"_id":0,"members":1}).populate({path:'members', select:'userName userEmail avatat userGUID'});
            console.log(team.members)
            const teamData = await Promise.all(
                team.members.map(async (user) => {
                    const taskData = await this.taskService.getUserTaskData(user._id,projectId._id);
                    return {user,taskData};
                })
            )
            const httpRes = new HttpResponse(teamData);
            return res.status(httpRes.statusCode).json(httpRes);
        }
        catch (err) {
            console.log(err);
            const error = new Error(SOMETHING_WRONG.errorMessage);
            error.statusCode = SOMETHING_WRONG.errorCode;
            next(error);
        }
    } 

    addTeamMember = async (req, res, next) =>{
        try {
            console.log(req.body)
            const projectId  = await this.projectService.getProjectId(req.body.filter.projectKey, req.body.filter.lead);
            if(!projectId){
                const error = new Error(PROJECT_NOT_FOUND.errorMessage);
                error.statusCode = PROJECT_NOT_FOUND.errorCode;
                return next(error);
            }
            const userId = await this.userModel.findOne({'userEmail':req.body.email},'_id');
            if(!userId){
                const error = new Error(USER_NOT_FOUND.errorMessage);
                error.statusCode = USER_NOT_FOUND.errorCode;
                return next(error);
            }

            const userInProject = await this.projectModel.findOne({'members':{$in:[userId]}},'_id');
            if(userInProject){
                const error = new Error(DUPLICATE_USER.errorMessage);
                error.statusCode = DUPLICATE_USER.errorCode;
                return next(error);
            }

            await this.projectModel.updateOne({_id:projectId},{$push: {members:userId}});
            req.query.projectKey = req.body.filter.projectKey;
            req.query.lead = req.body.filter.lead;

            return await this.getTeamInfo(req, res, next);
        }
        catch (err) {
            console.log(err);
            const error = new Error(SOMETHING_WRONG.errorMessage);
            error.statusCode = SOMETHING_WRONG.errorCode;
            next(error);
        }
    }



    getTasks = async (req, res, next) => {
        console.log("HELLO")
        try{
            const {searchText, pageIndex, pageSize} = req.query;
            const query = {
                $or: [
                  { title: { $regex: searchText, $options: 'i' } },
                  { name: { $regex: searchText, $options: 'i' } },
                ],
            };
            console.log(req.query.projectKey, req.query.lead);
            const projectId  = await this.projectService.getProjectId(req.query.projectKey, req.query.lead);
            if(!projectId){
                const error = new Error(PROJECT_NOT_FOUND.errorMessage);
                error.statusCode = PROJECT_NOT_FOUND.errorCode;
                return next(error);
            }
            query['project'] = projectId;
            if(req.query.statusFilter?.length > 0){
                query['status'] =  { $in:req.query.statusFilter}
            }
            if(req.query.priorityFilter?.length > 0){
                query['priority'] =  { $in:req.query.priorityFilter}
            }
            const select = TASK_LISTING_COLUMNS;
            const populate = {
                'key':'createdBy',
                'select':'userName avatar'
            }
            const tasks = await this.taskService.getTasks(query,select,populate,pageIndex,pageSize);
            const response = {
                'total': tasks.totalCount,
                'tasks': tasks.taskData
            }
            const httpRes = new HttpResponse(response);
            return res.status(200).json(httpRes);
        }
        catch(err){
            console.log(err);
            const error = new Error(SOMETHING_WRONG.errorMessage);
            error.statusCode = SOMETHING_WRONG.errorCode;
            next(error);
        }
    }
    
    createTask =  async (req, res, next) => {
        try {
            const projectId = await this.projectService.getProjectId(req.body.projectKey, req.body.lead);
            if(!projectId){
                const error = new Error(PROJECT_NOT_FOUND.errorMessage);
                error.statusCode = PROJECT_NOT_FOUND.errorCode;
                return next(error);
            }
            const taskData = {'createdBy':req.user._id,'project':projectId}
            const task = await this.taskService.createTask(taskData);
            const httpRes = new HttpResponse(task);
            return res.status(httpRes.statusCode).json(httpRes);
        }
        catch (err) {
            next(err);
        }
    }

    getTask = async (req, res, next) => {
        try{
            const {taskName,projectKey,lead} = req.query;
            const projectId = await this.projectService.getProjectId(projectKey, lead);
            if(!projectId){
                const error = new Error(PROJECT_NOT_FOUND.errorMessage);
                error.statusCode = PROJECT_NOT_FOUND.errorCode;
                return next(error);
            }
            const task = await this.taskService.getTask(taskName,projectId);
            if(!task){
                throw 'err';
            }
            const httpRes = new HttpResponse(task);
            return res.status(200).json(httpRes);
        }
        catch(err){
            const error = new Error(SOMETHING_WRONG.errorMessage);
            error.statusCode = SOMETHING_WRONG.errorCode;
            next(error);
        }
    }

    saveTask = async (req, res, next) =>{
        try{
            const projectId = await this.projectService.getProjectId(req.body.projectKey, req.body.lead);
            if(!projectId){
                const error = new Error(PROJECT_NOT_FOUND.errorMessage);
                error.statusCode = PROJECT_NOT_FOUND.errorCode;
                return next(error);
            }
            const query = {name:req.body.task.name,project:projectId};
            const task = await this.taskService.saveTask(query,req.body.key,req.body.value);
            const httpRes = new HttpResponse(task);
            return res.status(200).json(httpRes);
        }
        catch(error){
            next(error);
        }
    }

    changeAssignee = async (req, res, next ) => {
        try{
            const projectId = await this.projectService.getProjectId(req.body.projectKey, req.body.lead);
            if(!projectId){
                const error = new Error(PROJECT_NOT_FOUND.errorMessage);
                error.statusCode = PROJECT_NOT_FOUND.errorCode;
                return next(error);
            }
            const query = {name:req.body.taskName,project:projectId};
            const task = await this.taskService.changeAssignee(query,req.body.assignee);
            const httpRes = new HttpResponse(task);
            return res.status(200).json(httpRes);
        }
        catch(error){
            next(error);
        }
    }
    postComment = async (req, res, next) => {
        try{
            const projectId = await this.projectService.getProjectId(req.body.projectKey, req.body.lead);
            if(!projectId){
                const error = new Error(PROJECT_NOT_FOUND.errorMessage);
                error.statusCode = PROJECT_NOT_FOUND.errorCode;
                return next(error);
            }
            const query = {name:req.body.taskName,project:projectId};
            const comments = await this.taskService.postComment(query, req.body.commentString, req.user._id )
            const httpRes = new HttpResponse(comments);
            return res.status(200).json(httpRes);
        }
        catch(e){
            next(e);
        }
    }

    deleteComment = async (req, res, next) => {
        try{
            const projectId = await this.projectService.getProjectId(req.body.projectKey, req.body.lead);
            if(!projectId){
                const error = new Error(PROJECT_NOT_FOUND.errorMessage);
                error.statusCode = PROJECT_NOT_FOUND.errorCode;
                return next(error);
            }
            const query = {name:req.body.taskName,project:projectId};
            const comments = await this.taskService.deleteComment(query, req.body.commentGUID)
            const httpRes = new HttpResponse(comments);
            console.log(comments)
            return res.status(200).json(httpRes);
        }
        catch(e){
            next(e);
        }
    }

}

module.exports = new ProjectController(projectModel,projectService,taskService,userModel)