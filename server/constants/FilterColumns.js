const COLUMN_FILTERS = {
    COMMON : '-createdAt -updatedAt',
    COMMENT: '',
    USER_COMMENT: 'avatar userName userEmail'
}

const TASK_LISTING_COLUMNS = {
        'name':1,
        'title':1,
        'priority':1,
        'createdAt':1,
        'createdBy':1,
        'assignee':1,
        'status':1,
        'labels':1,
}

module.exports = {COLUMN_FILTERS,TASK_LISTING_COLUMNS};