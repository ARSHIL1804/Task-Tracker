const express = require("express");
const authRoute = require('../routes/auth.js');
const projectRoute = require('../routes/project.js');


const TokenExpiredError = require("jsonwebtoken/lib/TokenExpiredError.js");
const { SOMETHING_WRONG,SESSION_EXPIRED } = require("../constants/ErrorEnums.js");

module.exports.setRoutes = (app) => {
    app.get('/',(req,res)=>{
        res.send('Welcome to the APP');
    })

    app.use('/auth',authRoute);
    app.use('/projects',projectRoute);


    app.use((err, req, res, next) => {
        console.log(err);
        if(err instanceof TokenExpiredError){
            return res.status(SESSION_EXPIRED.errorCode).json(SESSION_EXPIRED.errorMessage);
        }
        else if (err instanceof Error){
            
            return res.status(err.statusCode).json(err.message);
        }
        else {
            const error = new Error(SOMETHING_WRONG.errorMessage)
            error.statusCode = SOMETHING_WRONG.errorCode;
            return res.status(err.status).json(err.message);
        }
    });

};
