const mongoose = require('mongoose');


const userModel = mongoose.Schema({
    sex:{type: Number, require:true},       //0 Men | 1 Women
    firstName:{type: String, require:true}, //Name
    email:{type: String,require:true},      //name@gmail.com
    tel:{type: String,require:false},      //+33 6 34567890
    passw:{type: String,require:true},      //azertghe567
    age:{type: Number,require:true},        //19 y

});

module.exports = mongoose.model('userModel', userModel);