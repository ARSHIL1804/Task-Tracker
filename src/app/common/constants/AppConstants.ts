import { STATUS,PRIORITY } from "./AppEnums"

export const USER_AVATAR = [
    {
        id : 'avatar1',
        path:'assets/images/avatar/avatar1.jpg',
    },
    {
        id : 'avatar2',
        path:'assets/images/avatar/avatar2.jpg',
    },
    {
        id : 'avatar3',
        path:'assets/images/avatar/avatar3.jpg',
    },
    {
        id : 'avatar4',
        path:'assets/images/avatar/avatar4.jpg',
    },
    {
        id : 'avatar5',
        path:'assets/images/avatar/avatar5.jpg',
    },
    {
        id : 'avatar6',
        path:'assets/images/avatar/avatar6.jpg',
    },

    {
        id : 'avatar7',
        path:'assets/images/avatar/avatar7.jpg',
    },
    {
        id : 'avatar8',
        path:'assets/images/avatar/avatar8.jpg'        
    },
]
export const EDITOR_CONFIG={
    selector: '.description',
    toolbar: 'undo redo | blocks | image',
    images_upload_url: '',
    height:'300px',
    resize: false,
    menubar: false,
}

export const STATUS_TRANSITIONS = {
    0 : [   
            {'status':STATUS.TODO ,'text':'To Do '},
            {'status':STATUS.IN_PROGRESS ,'text':'In Progress'}
        ],
    1 : [
            {'status':STATUS.IN_PROGRESS ,'text':'In Progress'},
            {'status':STATUS.COMPLETED ,'text':'Completed'}
        ],
    2 : [
            {'status':STATUS.COMPLETED ,'text':'Completed'},
            {'status':STATUS.REOPEN ,'text' :'Reopen'}
        ],
    3 : [
            {'status':STATUS.REOPEN ,'text' :'Reopen'},
            {'status':STATUS.TODO ,'text':'To Do '},
        ],
}

export const  STATUS_CSS_CLASS = {
    0 : 'status-todo',
    1 : 'status-in-progress',
    2 : 'status-completed',
    3 : 'status-reopen',
}

export const STATUS_LIST = [{'id':STATUS.TODO , 'value':'TO-DO'}, {'id':STATUS.IN_PROGRESS ,'value' :'IN PROGRESS'},  {'id':STATUS.COMPLETED, 'value':'COMPLETED'}, {'id':STATUS.REOPEN, 'value':'REOPEN'}];
export const PRIORITY_LIST = [{'id':PRIORITY.LOW , 'value':'LOW'}, {'id':PRIORITY.MEDIUM ,'value' :'MEDIUM'},  {'id':PRIORITY.HIGH, 'value':'HIGH'}, {'id':PRIORITY.HIGHEST, 'value':'HIGHEST'}];

