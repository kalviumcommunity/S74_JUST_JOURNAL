const mongoose = require('mongoose')

const JournalSchema =  new mongoose.Schema({
    date:{type:String,required:true},
    title:{type:String,required:true},
    content:{type:String,required:true}
})

const Journalmodel = mongoose.model('Journals',JournalSchema)

module.exports = Journalmodel;