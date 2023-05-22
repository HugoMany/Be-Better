const mongoose = require('mongoose'); 
const coJournaliere = mongoose.Schema(
    {   
        idUser:{type: String, require:true},
        date: [{ date: String}],
    }); 

module.exports = mongoose.model('coJournaliere', coJournaliere);
