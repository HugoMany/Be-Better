const mongoose = require('mongoose');


const userModel = mongoose.Schema({
    userId:{type: Number, require:true},    // Id
    sex:{type: Number, require:true},       // 0 Men | 1 Women
    firstName:{type: String, require:true}, //Name
    email:{type: String,require:true},      // name@gmail.com
    passw:{type: String,require:true},      //azertghe567
    age:{type: Number,require:true},        //19 y
    weight:{type: Number,require:true},     //178 cm
    height:{type: Number,require:true},     //61 000 g

});

module.exports = mongoose.model('userModel', userModel);