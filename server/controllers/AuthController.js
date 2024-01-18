const { HttpResponse } = require("../helpers/HttpResponse");
const {USER_NOT_FOUND, PASS_WRONG, SOMETHING_WRONG, DUPLICATE_USER } = require("../constants/ErrorEnums");
const { authService } = require("../services/AuthService");
const { userModel } = require("../models/User");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login = async(req, res, next) => {
        try {
            const user = await authService.findByEmail(req.body.userEmail);
            if (!user) {
                const error = new Error(USER_NOT_FOUND.errorMessage);
                error.statusCode = USER_NOT_FOUND.errorCode;
                return next(error);
            }
            else {
                const isPasswordCorrect = await user.comparePassword(req.body.userPassword);
                if (!isPasswordCorrect) {
                    const error = new Error(PASS_WRONG.errorMessage);
                    error.statusCode = PASS_WRONG.errorCode;
                    return next(error);
                }
                else {
                    const tokenData = await this.authService.storeSession(user);
                    console.log('tokenData',tokenData);
                    const httpRes = new HttpResponse(tokenData);
                    return res.status(httpRes.statusCode).json(httpRes);
                }
            }

        }
        catch (e) {
           const error = new Error(SOMETHING_WRONG.errorMessage);
           error.errorCode = SOMETHING_WRONG.errorCode;
           next(error);
        }
    }

    register = async (req, res, next) => {
        try {
            const userData = req.body.userData;
            console.log(userData);
            const user = await this.authService.findByEmail(userData.userEmail);
            console.log("HELLO ",user);
            if(user){
                const error = new Error(DUPLICATE_USER.errorMessage);
                error.statusCode = DUPLICATE_USER.errorCode;
                return next(error);
            }

            const tokenData = await this.authService.createUser(userData);           
            const httpRes = new HttpResponse(tokenData);
            return res.status(httpRes.statusCode).json(httpRes);
        }
        catch (e) {
            console.log(e)
            const error = new Error(SOMETHING_WRONG.errorMessage);
            error.statusCode = SOMETHING_WRONG.errorCode;
            next(error);
        }
    }

    logout = async (req,res,next) => {
        try{
            const token = this.extractToken(req);
            this.authService.logout(token);
            const httpRes = new HttpResponse('Deleted');
            return res.status(httpRes.statusCode).json(httpRes);
        }
        catch(error){
            next(error);
        }
    }

    saveUserData = async (req, res, next) =>{
        try{
            const user = await this.authService.findByEmail(req.body.userEmail);
            if(user){
                const error = new Error(DUPLICATE_USER.errorMessage);
                error.statusCode = DUPLICATE_USER.errorCode;
                return next(error);
            }
            const userId = req.user._id;
            await userModel.updateOne({_id:userId},{$set: { userEmail:req.body.userEmail, userName:req.body.userName, avatar:req.body.avatar }})
            const httpRes = new HttpResponse('Updated');
            return res.status(httpRes.statusCode).json(httpRes);
        }
        catch(error){
            next(error);
        }
    }

    getUser = async (req, res, next)=>{
        try {
            const user = req.user;
            const httpRes = new HttpResponse(user)
            return res.status(httpRes.statusCode).json(httpRes);
        } catch (error) {
            next(error);
        }
    }


    checkLogin = async (req, res, next) => {
        try {
            const token = this.extractToken(req);
            req.user = await this.authService.checkLogin(token);
            req.token = token;
            next();
        } catch (error) {
            next(error);
        }
    }


    extractToken = (req) => {
        if(req.headers.authorization){
            return req.headers.authorization;
        }
       const error = new Error(INVALID_TOKEN.errorMessage);
       error.statusCode = INVALID_TOKEN.errorCode;
       throw error; 
    }

}
module.exports = new AuthController(authService)