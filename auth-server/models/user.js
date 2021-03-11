var mongoose = require('mongoose')


var userSchema = new mongoose.Schema({
    username: { type:  String, required: true },
    email: { type:  String, required: true },
    password: { type:  String, required: true },
    createdAt: {type: Date, default: Date.now},
    published_at: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    date_of_registry: {type: Date, default: Date.now}
    
})


module.exports = mongoose.model('utilizadore' , userSchema)