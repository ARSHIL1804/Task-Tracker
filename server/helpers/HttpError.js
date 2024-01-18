class HttpError {
    constructor(error){
        this.statusCode = error.statusCode ? error.statusCode : 500;
        this.message = error.message || 'Something wen wrong!';
        this.errors = error.errors;
    }
}

module.exports = { HttpError };
