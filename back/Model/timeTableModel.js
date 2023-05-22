const mongoose = require('mongoose'); 
const timeTableModel = mongoose.Schema(
    {   
        id:{type: String, require:true},
        timeTable: {type: String, require:true},
    }); 

module.exports = mongoose.model('timeTableModel', timeTableModel);
