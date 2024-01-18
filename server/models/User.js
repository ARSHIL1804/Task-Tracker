const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const { genrateGUID } = require('../helpers/GuidGenrator');
const bcrypt = require( 'bcrypt' ),
    SALT_WORK_FACTOR = 10;



const userSchema = new Schema( {
    'userName': {
        'type': String,
        'required': true,
    },
    'userGUID': {
        'type': String,
    },
    'userEmail': {
        'type': String,
        'unique': true,
        'required': true,
    },
    'userPassword': {
        'type': String,
        'required': true,
    },
    'avatar': {
        'type': String,
        'enum': ['avatar1','avatar2','avatar3','avatar4','avatar5','avatar6','avatar7','avatar8'],
        'default': 'avatar1'
    }
}, { 'timestamps': true } );

userSchema.pre('save', function(next) {
    const user = this;
    if(this.isNew){
        user.userGUID = genrateGUID('user');
    }
    if (this.isModified('userPassword' ) || this.isNew ) {
        bcrypt.genSalt(SALT_WORK_FACTOR, (err,salt) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.userPassword,salt,(hashErr,hash) => {
                if (hashErr)return next(hashErr);
                user.userPassword = hash;
                next();
            } );
        } );
    } else {
        return next();
    }
} );
userSchema.methods.comparePassword = async function(candidatePassword) {
    return new Promise((resolve,reject) => {
        bcrypt.compare(candidatePassword,this.userPassword,(err,isMatch) => {
            if ( err ) {
                reject( err );
            } else {
                resolve(isMatch);
            }
        } );
    } );
};
userSchema.statics.getId = async function(query){
    return this.findOne(query,{'_id':1});
}

const userModel = mongoose.model('user',userSchema);
module.exports ={userModel}