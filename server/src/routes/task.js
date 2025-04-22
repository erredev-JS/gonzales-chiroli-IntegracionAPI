const express = require('express')
const router = express.Router()
const taskControllers = require('../controllers/taskControllers')

// Mostrar todas las tareas
router.get('/' , taskControllers.getAllTask)

// Mostrar Tarea por ID
router.get('/:id', taskControllers.getTaskById)

// Mostrar tareas por estado
router.get('/tasks', taskControllers.getTasksForState)

// Crear Tarea
router.post('/', taskControllers.postTask)

// Editar Tarea
router.put('/:id', taskControllers.putTask)

// Delete Tarea
router.delete('/:id', taskControllers.deleteTask)
module.exports = router