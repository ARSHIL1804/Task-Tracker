const mongoose = require('mongoose');
const mongoURL = require('./config').MONGO_URL;

class Connection{
    constructor(){
        this.connect(mongoURL).then(()=>{
            console.log('✔ Database Connected');
        }).catch((err)=>{
            console.error('✘ MONGODB ERROR:', err.message);
        });
    }

    async connect(url){
        try{
            await mongoose.connect(url);
        }
        catch(e){
            throw e;
        }
    }
}

module.exports = new Connection();
