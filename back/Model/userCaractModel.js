const mongoose = require('mongoose'); 
const userCaractModel = mongoose.Schema(
    {   
        idUser:{type: String, require:true},
        sexe:{type: Number, require:true},
        allWeigh: [{value: Number, //in kg
                    date: String, // DD/MM/YYYY
                 }],
        height: {type: Number, require:true},
    }); 

module.exports = mongoose.model('userCaractModel', userCaractModel);
