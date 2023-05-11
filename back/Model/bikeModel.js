const mongoose = require('mongoose'); 
const bikeModel = mongoose.Schema(
    {   exerciceName:{type: String, require:true},
        description:{type: String, require:true},
        level:{type: Number, require:true},
    }); 

module.exports = mongoose.model('bikeModel', bikeModel);