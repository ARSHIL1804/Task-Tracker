const { SOMETHING_WRONG, TASK_NOT_FOUND } = require("../constants/ErrorEnums");
const mongoose = require('mongoose');
const COLUMN_FILTERS = require("../constants/FilterColumns");
const { taskModel } = require("../models/Task");
const { commentModel } = require("../models/Comment");
const { projectService } = require("./ProjectService");
const { userModel } = require("../models/User");
userModel

class TaskService{

    createTask = async (taskData) => { 
        const session = await mongoose.startSession();
        try{
            session.startTransaction();
            const task = await taskModel.create(taskData);
            session.commitTransaction();
            return task;
        }   
        catch(error){
            session.abortTransaction();
            throw error;
        }     
    }

    saveTask = async (query,key,value) =>{
        try{
            const response = await taskModel.updateOne(query,{$set: { [key]: value }});
            return response;
        }
        catch(error){
            throw error;
        }
    }

    getTasks = async (query, select, populate, pageIndex, pageSize) => {
        const totalCount = await taskModel.countDocuments(query);
        console.log(query,select, populate, pageIndex, pageSize)
        const skip = (pageIndex - 1 )*pageSize;
        const taskData = await taskModel.find(query,select).populate({path:populate.key,select:populate.select}).skip(skip).limit(pageSize);
        console.log(taskData)
        return {totalCount,taskData}
    }

    getTask = async (taskName,projectId) => {
        try {
            const query = {
                name:`${taskName}`,
                project: projectId,
            };
            const task = await taskModel.findOne(query).populate({path:'comments',populate:{path:'postBy',select:COLUMN_FILTERS.USER_COMMENT},select:COLUMN_FILTERS.COMMENT, options:{sort:{createdAt:-1}}})
                                                       .populate({path:'createdBy',select:'userName avatar'})
                                                       .populate({path:'assignee',select:'userName avatar'});

            return task;
        } 
        catch (error) {
            throw error;
        }
    }
    
    changeAssignee = async (query,userGUID) => {
        try {
            const userId = await userModel.getId({'userGUID':userGUID})
            const task = await taskModel.updateOne(query,{$set: { assignee: userId._id}});
            return task;
        } 
        catch (error) {
            throw error;
        }
    }
    postComment = async (query, commentString, userId) => {
        const session = await mongoose.startSession();
        try {
            const task = await taskModel.getId(query);
            if(!task){
                const error = new Error(SOMETHING_WRONG.errorMessage);
                error.statusCode = SOMETHING_WRONG.errorCode;
                throw error;
            }
            session.startTransaction();
            const comment = await commentModel.create({
                                'commentString': commentString,
                                'postBy': userId,
                            });
            await taskModel.updateOne({_id: task._id},{$push: { comments: comment._id }});
            const comments = await taskModel.find({_id: task._id},{'_id':0,'comments':1}).populate({path:'comments',populate:{path:'postBy',select:COLUMN_FILTERS.USER_COMMENT},options:{sort:{createdAt:-1}}});
            session.commitTransaction();
            return comments;
        }
        catch (error) {
            session.abortTransaction();
            throw error;
        }
    }

    deleteComment = async (query, commentGUID) => {
        const session = await mongoose.startSession();
        try {
            const comment = await commentModel.getId({'commentGUID':commentGUID});
            const task = await taskModel.getId(query);
            if(!comment){
                const error = new Error(SOMETHING_WRONG.errorMessage);
                error.statusCode = SOMETHING_WRONG.errorCode;
                throw error;
            }
            session.startTransaction();
            await taskModel.updateOne({_id: task._id},{$pull: { comments: comment._id }});
            const comments = await taskModel.find({_id: task._id},{'comments':1}).populate({path:'comments',populate:{path:'postBy',select:COLUMN_FILTERS.USER_COMMENT},options:{sort:{createdAt:-1}}});
            session.commitTransaction();
            return comments;
        }
        catch (error) {
            session.abortTransaction();
            throw error;
        }
    }

    getUserTaskData = async (userId,projectId) =>{
        const data = await taskModel.find({
            project:projectId,
            assignee: userId
        },'status')
        
        var inProgressTasks = data.filter(task => task.status === 1).length;
        var completedTasks = data.filter(task => task.status === 2).length;

        var totalTasks = data.length;
        return {completedTasks,inProgressTasks,totalTasks};
    }
}

const taskService = new TaskService();
module.exports = {taskService};