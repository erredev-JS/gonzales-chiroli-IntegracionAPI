const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion : {
        type : String,
        default: ''
    },
    estado: {
        type : String,
        enum : ['pendiente', 'en_progreso', 'completado'],
        default: 'pendiente'
    },
    fechaLimite : {
        type: String,
        required: true,
    },
})

const task = mongoose.model('Task', taskSchema)

module.exports = task

