const mongoose = require('mongoose')
const { type } = require('os')

const backlogSchema = new mongoose.Schema({
    tareas : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        default: []
    }]
})

const backlog = mongoose.model('Backlog', backlogSchema)

module.exports = backlog    