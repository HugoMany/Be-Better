const mongoose = require('mongoose'); 
const muscuModel = mongoose.Schema(
    {   exerciceName:{type: String, require:true},
        description:{type: String, require:true},
        muscularGroup:{type:String, require: true},
        level:{type: Number, require:true},
        numberOfRep:{type: Number,require:true},
        photo:{type: String,require:true}, 
    }); 

module.exports = mongoose.model('muscuModel', muscuModel);