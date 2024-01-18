const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const jwt = require( 'jsonwebtoken' );
const jwtKey = require('../config/config').JWT_SECRET,
               jwtExpirySeconds = 172800

const authSchema = new Schema({
    'user':{
        'type':Schema.Types.ObjectId,
        'required': true,
        'ref': 'user'
    },
    'token':{
        'type': String,
        'required': true,
    },
},{'timestamps': true});

authSchema.statics.genrateToken = async function(user){
    try{
        const token = jwt.sign({
            'userGUID': user.userGUID,
            'userName': user.userName,
            'userEmail': user.userEmail,
        }, jwtKey, {
            'algorithm': 'HS256',
            'expiresIn': jwtExpirySeconds,
        });
        return token;
    }
    catch(e){
       throw e;
    }
}
authSchema.statics.decodeToken = async function( token ) {
    try {
        let user = jwt.verify(token, jwtKey);
        return user;
    } catch ( e ) {
        throw e;
    }
};

const authModel = mongoose.model('auth',authSchema);

module.exports = {authModel};