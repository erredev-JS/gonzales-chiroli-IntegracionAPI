const mongoose = require('mongoose')

const sprintSchema = new mongoose.Schema({
    nombre : {
        type: String,
        required : true
    },
    fechaInicio : {
        type : String,
        required : true
    },
    fechaLimite : {
        type : String,
        required : true
    },
    tareas : [{
        type: mongoose.Schema.Types.ObjectId, ref: "Task", default: []
    }]
})



const Sprint = mongoose.model('Sprints', sprintSchema)

module.exports = Sprint