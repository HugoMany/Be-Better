const mongoose = require('mongoose'); 
const runModel = mongoose.Schema(
    {   exerciceName:{type: String, require:true},
        description:{type: String, require:true},
        level:{type: Number, require:true},
        fract:{type: Boolean, require:true},
    }); 

module.exports = mongoose.model('runModel', runModel);