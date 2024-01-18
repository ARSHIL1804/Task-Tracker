const { default: mongoose } = require("mongoose");
const { authModel } = require("../models/Auth");
const { userModel } = require("../models/User");


const COLUMN_FILTERS = require("../constants/FilterColumns");
const { SOMETHING_WRONG, INVALID_TOKEN } = require("../constants/ErrorEnums");


class AuthService{

    createUser = async (userData) =>{ 
        const user = await userModel.create(userData);
        console.log(userData,user);
        if (!user) {

            throw 'error';
        }
        else {
            return await this.storeSession(user);
        }
    }
    storeSession = async (user) => {
        const token =  await authModel.genrateToken(user);
        console.log(token);
        await authModel.create({ token, 'user': new mongoose.mongo.ObjectId(user._id) });
        const tokenData = await authModel.findOne({'token':token},COLUMN_FILTERS.COMMON).populate({path:'user',select:COLUMN_FILTERS.COMMON});
        console.log(tokenData);
        return tokenData;
    }
    checkLogin = async (token) => {
        try{
            const tokenInDB = await authModel.countDocuments({token});
            if(!tokenInDB){
                const error = new Error(INVALID_TOKEN.errorMessage)
                error.statusCode = INVALID_TOKEN.errorCode;
                throw error;
            }
            const user = await authModel.decodeToken(token);
            if(!user){
                const error = new Error('Invalid Token')
                error.statusCode = 401;
                return error;
            }
            const userInDB = await this.findByGUID(user.userGUID);
            if(userInDB){
                return userInDB;
            }
            const error = new Error('Invalid Token');
            throw error;
        }
        catch(error){
            throw error;
        }
    }

    logout = async(token) => {
        try{
            authModel.deleteMany({token});
        }
        catch(e){
            const error = new Error(SOMETHING_WRONG.errorMessage);
            error.statusCode = SOMETHING_WRONG.errorCode;
            throw error;
        }
    }

    findByEmail = async (email) =>{
        return await userModel.findOne({'userEmail': email });
    }

    findByGUID = async (userGUID) => { 
        return await userModel.findOne({'userGUID': userGUID});
    };
}

const authService = new AuthService();
module.exports = {authService};