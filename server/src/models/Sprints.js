const mongoose = require('mongoose')

const sprintSchema = new mongoose.Schema({
    fechaInicio : {
        type : Date,
        required : true
    },
    fechaLimite : {
        type : Date,
        required : true
    },
    tareas : [{
        type: mongoose.Schema.Types.ObjectId, ref: "Task", default: []
    }]
})

const sprint = mongoose.model('Sprints', sprintSchema)

module.exports = sprint