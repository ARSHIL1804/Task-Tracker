const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const { genrateGUID } = require('../helpers/GuidGenrator');



const projectSchema = new Schema({
    'name':{
        'type': String,
    },
    'key':{
        'type': String,
    },
    'projectGUID':{
        'type':String,
    },
    'description':{
        'type': String,
        default: '',
    },
    'lead':{
        'type':Schema.Types.ObjectId,
        'required': true,
        'ref': 'user'
    },
    'members':{
        'type':[Schema.Types.ObjectId],
        'required': true,
        'ref': 'user',
    }
},{'timestamps': true});

projectSchema.pre('save', function(next) {
    const project = this;
    if(this.isNew){
        project.projectGUID = genrateGUID('project');
    }
    next();
})

const projectModel = mongoose.model('project',projectSchema);

module.exports = {projectModel};