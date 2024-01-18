export const SERVER = 'http://localhost:5000/'

export const API_CONTANTS = {
    USER_SIGN_UP : SERVER + 'auth/sign-up',
    USER_LOG_IN : SERVER + 'auth/log-in',

    GET_USER: SERVER + 'auth/get-user',
    LOG_OUT: SERVER + 'auth/logout',
    SAVE_USER_INFO : SERVER + 'auth/save-user-info',
    
    GET_TASKS: SERVER + 'projects/tasks',
    CREATE_TASK: SERVER + 'projects/tasks/create-task',
    GET_TASK: SERVER  + 'projects/tasks/get-task',
    SAVE_TASK: SERVER + 'projects/task/save-task',
    CHANGE_ASSIGNEE: SERVER + 'projects/task/change-assignee',

    POST_COMMENT: SERVER + 'projects/task/post-comment',
    DELETE_COMMENT: SERVER + 'projects/task/delete-comment',


    GET_PROJECTS: SERVER + 'projects',
    CREATE_PROJECT: SERVER + 'projects/create-project',
    GET_PROJECT: SERVER + 'projects/get-project',
    GET_TEAM_MEMBERS_NAME: SERVER + 'projects/project/team-members-names',
    GET_TEAM: SERVER + 'projects/project/team',
    ADD_MEMBER: SERVER + 'projects/project/add-member',


    


    




}