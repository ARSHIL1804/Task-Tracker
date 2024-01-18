const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const { genrateGUID } = require('../helpers/GuidGenrator');


const commentSchema = new Schema({
    'commentGUID': {
        'type': String,
    },
    'commentString':{
        'type': String,
        require: Boolean
    }, 
    'postBy':{
        'type':Schema.Types.ObjectId,
        'ref': 'user',
        require:true,
    },
},{'timestamps': true});


commentSchema.pre('save', function(next) {
    const comment = this;
    if(this.isNew){
        comment.commentGUID = genrateGUID('comment');
    }
    return next()
});

commentSchema.statics.getId = async function(query){
    return this.findOne(query,{'_id':1});
}
const commentModel = mongoose.model('comment',commentSchema);

module.exports = {commentModel};