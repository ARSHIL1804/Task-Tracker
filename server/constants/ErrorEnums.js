const ERROR_ENUMS = {

    DUPLICATE_USER : {
        'errorCode' : 512,
        'errorMessage': 'User already exits'
    },
    USER_NOT_FOUND : {
        'errorCode' : 513,
        'errorMessage': 'User Does Not Exist'
    },
    PASS_WRONG : {
        'errorCode' : 514,
        'errorMessage': 'Password Is Wrong'
    },
    SESSION_EXPIRED : {
        'errorCode' : 515,
        'errorMessage': 'Session Expired'
    },
    INVALID_TOKEN : {
        'errorCode' : 516,
        'errorMessage': 'INVALID TOKEN'
    },
    SOMETHING_WRONG : {
        'errorCode' : 520,
        'errorMessage': 'Something wrong happened'
    },

    DUPLICATE_PROJECT_NAME : {
        'errorCode' : 521,
        'errorMessage': 'Project name already in use'
    },

    DUPLICATE_PROJECT_KEY : {
        'errorCode' : 522,
        'errorMessage': 'Project key already in use'
    },

    PROJECT_NOT_FOUND : {
        'errorCode' : 523,
        'errorMessage': 'Project not found'
    }

}


module.exports = ERROR_ENUMS;