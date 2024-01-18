export const ERROR_ENUMS = {
    
    DUPLICATE_USER : {
        'errorCode' : 512,
        'errorMessage': 'User already exits'
    },
    USER_NOT_FOUND : {
        'errorCode' : 513,
        'errorMessage': 'User does not Exist'
    },
    PASS_WRONG : {
        'errorCode' : 514,
        'errorMessage': 'Password is wrong'
    },
    SESSION_EXPIRED : {
        'errorCode' : 515,
        'errorMessage': 'Session expired'
    },
    INVALID_TOKEN : {
        'errorCode' : 516,
        'errorMessage': 'Invalid Token'
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
}
