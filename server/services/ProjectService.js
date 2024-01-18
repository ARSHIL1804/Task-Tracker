const { projectModel } = require("../models/ProjectModel");
const { userModel } = require("../models/User");


class ProjectService{

    async getProjectId(projectKey,lead){
        const userLead = await userModel.findOne({'userName':lead},'_id');
        return await projectModel.findOne({key:projectKey,lead:userLead},'_id')
    }

    
}

const projectService = new ProjectService();
module.exports = {projectService};