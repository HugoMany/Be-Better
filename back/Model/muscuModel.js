const mongoose = require('mongoose');


const muscuModel = mongoose.Schema({
    nomExo:{type: String, require:true},       
    niveau:{type: Number, require:true}, 
    nbRep:{type: Number,require:true},     
    photo:{type: String,require:true},      
});

module.exports = mongoose.model('muscuModel', muscuModel);

