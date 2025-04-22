const Backlog = require('../../src/models/Backlog')
const Tasks = require('../../src/models/Task')

// Mostrar Backlog
exports.getBacklog = async (req, res) => {
    try {
        const backlog = await Backlog.findOne().populate('tasks')
        if(!backlog) return res.status(404).json({msg : 'El backlog no ha sido encontrado'})
        await res.status(200).json(backlog)
    } catch (err) {
        res.status(500).json({err : err.message})
    }
}

// Crear Backlog
exports.postBacklog = async (req, res) => { 
    try {
        const backlog = await Backlog.findOne().populate()
        if (backlog) return res.status(201).json({msg : 'El backlog ya ha sido creado'})
        
        const newBacklog = await Backlog(req.body)
        await newBacklog.save()
        res.status(201).json({msg : 'El backlog ha sido creado'})
    } catch (err) {
        res.status(500).json({err : err.message})
    }
}

// Agregar una Tarea al Backlog
exports.putBacklog = async (req, res) => {
    try {
        const backlog = await Backlog.findOne()
        const task = await Tasks.findById(req.params.taskId)
        if (!backlog || !task) {
            return  res.status(404).json({msg : 'No se encontro el recurso'})
        }
        // Si no se encuentra en el backlog lo agrego
        if (!backlog.tasks.includes(task._id)) {
            backlog.tasks.push(task._id)
            await backlog.save()
        }
        res.status(200).json(backlog)
    } catch (err) {
        res.status(500).json({err : err.message})
    }
}
