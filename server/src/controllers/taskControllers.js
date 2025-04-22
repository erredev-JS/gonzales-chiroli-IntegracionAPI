const Task = require('../models/Task')
const Sprint = require('../models/Sprints')

// Mostrar todas las tareas
exports.getAllTask = async (req, res)  => {
    try {
        const tasks = await Task.find().sort({limitDate : 1})
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({error : err.message})
    }
}

// Mostrar la Tarea por ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).json({error : 'No se encontro la tarea'})
        res.status(200).json(task)
    } catch (err) {
        res.status(500).json({error : err.message})
    }
}

// Filtro de Tareas por estado
exports.getTasksForState = async(req, res) => { 
    
    const state = req.query.estado // Recibe el estado de la query
    try {
        const tasks = await Task.find({state : state}) // Lo filtra directamente en mongo por estado
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

// Crear Tarea
exports.postTask = async (req, res) => {
    try {
        const newTask = await Task(req.body)
        await newTask.save() // Guardo la tarea
        res.status(201).json(newTask) // Envio el nuevo estado con la tarea
    } catch (err) {
        res.status(500).json({err : err.message})
    }
}

// Editar Tarea
exports.putTask = async (req, res) => { 
    try {
        const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true})
        if (!updateTask) return res.status(404).json({msg : 'Tarea no encontrada'})
        res.status(200).json(updateTask)
    } catch (err) {
        res.status(500).json({erro : err.message})
    }
}

// Eliminar Tarea
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id) 
        if (!task) return res.status(404).json({msg : 'No se encontro la tarea'})
        const sprint = await Sprint.findOne({tasks : task._id})
        if (sprint) return res.status(400).json({msg : 'No se puede eliminar una tarea asignada a una sprint'})
        await task.deleteOne() // Elimino la tarea
        res.status(200).json({msg : 'Tarea eliminada'})
    } catch (err) {
        res.status(500).json({err : err.message})
    }
}