const Sprint = require('../../src/models/Sprints')
const Tasks = require('../../src/models/Task')

// Mostrar todas las Sprints
exports.getAllSprints = async (req, res) => {
    try {
        const sprints = await Sprint.find()
        res.status(200).json(sprints)
    } catch (error) {
        res.status(500).json({msg : 'No se encontraron sprints'})
    }
}

// Mostrar las Sprints por ID
exports.getSprintById = async (req, res) => {
    try {
        const sprint = await Sprint.findById(req.params.id)
        if(!sprint) return res.status(404).json({msg : 'Sprint no encontrada'})
        res.status(200).json(sprint)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}


// Crear Sprint
exports.postSprint = async (req, res) => {
    try {
        const newSprint = await Sprint(req.body)
        await newSprint.save()
        res.status(201).json(newSprint)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

// Editar Sprint
exports.putSprints = async (req, res) => {
    try {
        const sprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, {new : true})
        if (!sprint) return res.status(404).json({msg : 'Sprint no encontrada'})
        const updateSprint = await Sprint.findById(sprint._id).populate('tasks') 
        res.status(201).json(updateSprint)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

// Agregar una Tarea a una Sprint 

exports.addTaskToSprint = async (req, res) => {
    try {
        const sprint = await Sprint.findById(req.params.id).populate('tasks')
        const task = await Tasks.findById(req.params.taskId)
        if(!sprint || !task) return res.status(404).json({msg : 'No se encontro un recurso'})
        
        // Si no esta en la sprint la agrego
        if(!sprint.tasks.includes(task._id)){ 
            sprint.tasks.push(task._id)
            await sprint.save()
        }
        const updateSprint = await Sprint.findById(req.params.id).populate('tasks')
        res.status(200).json(updateSprint) // Muestro la sprint actualizada
    } catch (error) {
        res.status(500).json({msg : error.message})
    }    
}

// Delete Sprint 
exports.deleteSprint = async (req, res) => {
    try {
        const deleteSprint = await Sprint.findByIdAndDelete(req.params.id)
        if (!deleteSprint) return res.status(404).json({msg : 'No se encontro la sprint'})
        res.status(200).json({msg : 'Sprint eliminada'})
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}