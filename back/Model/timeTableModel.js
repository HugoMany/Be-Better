const mongoose = require('mongoose'); 
const timeTableModel = mongoose.Schema(
    {   
        id:{type: String, require:true},
        dateOfMonday:{type: String, require:true},
        // timeTable: [{case: Number, data: String , importance: String}],
        timeTable: {type: String, require:true},
    }); 

module.exports = mongoose.model('timeTableModel', timeTableModel);
