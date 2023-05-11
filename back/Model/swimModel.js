const mongoose = require('mongoose'); 
const swimModel = mongoose.Schema(
    {   exerciceName:{type: String, require:true},
        description:{type: String, require:true},
        level:{type: Number, require:true},
    }); 

module.exports = mongoose.model('swimModel', swimModel);