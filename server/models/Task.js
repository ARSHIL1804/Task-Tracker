const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const { projectService } = require('../services/ProjectService');
const { projectModel } = require('./ProjectModel');


const taskSchema = new Schema({
    'name':{
        'type': String,
    },
    'nameId':{
        'type': Number,
    },
    'title':{
        type: String,
        default: 'Untitle'
    },
    'description':{
        'type': String,
        default: '',
    },
    'priority':{
        'type': Number,
        default: 1,
    },
    'attachments':{
        'type': [String],
        default: [],
    },
    'linkedTasks':{
        type: [Schema.Types.ObjectId],
        default:[],
        'ref': 'task'
    },
    'createdBy':{
        'type':Schema.Types.ObjectId,
        'required': true,
        'ref': 'user'
    },
    'assignee':{
        'type':Schema.Types.ObjectId,
        'ref': 'user'
    },
    'updatedBy':{
        'type': Schema.Types.ObjectId,
        'ref': 'user'
    },
    'status':{
        'type': Number,
        default: 0
    },
    'labels':{
        'type': String,
        default:''
    },   
    'project':{
        'type':Schema.Types.ObjectId,
        'ref': 'project',
        default:null
    },
    'isProjectTask':{
        'type':Boolean,
        'default': false
    },
    'comments':{
        'type':[Schema.Types.ObjectId],
        'ref': 'comment',
        'default':[]
    }
},{'timestamps': true});


taskSchema.pre('save',async function(next){
    if(this.isNew){
        try{
            let latest = await this.constructor.find({},'nameId').sort({'nameId':-1}).limit(1).exec();
            const maxId = latest[0]?.nameId;
            this.nameId = maxId ? maxId + 1 : 1;
            if(this.project){
                const project = await projectModel.findOne({'_id':this.project},'key');
                this.name = project.key +  '-'+  this.nameId;
            }
            else{
                this.name = 'TASK-' + this.nameId;
            }
        }
        catch(error){
            return next(error) 
        }
    }
    next()
});


taskSchema.statics.getId = async function(query){
    return this.findOne(query,{'_id':1});
}

const taskModel = mongoose.model('task',taskSchema);

module.exports = {taskModel};