const mongoose = require('mongoose');
const sleepModel = mongoose.Schema(
    {
        idUser: { type: String, require: true },
        sleeps: [{
            value: String, //in h
            date: String, // DD/MM/YYYY
        }],
    });

module.exports = mongoose.model('sleepModel', sleepModel);
