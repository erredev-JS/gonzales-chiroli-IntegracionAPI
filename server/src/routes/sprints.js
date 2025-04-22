const express = require('express')
const router = express.Router()
const sprintsController = require('../controllers/sprintControllers')

// Mostrar todas las Sprints 
router.get('/' , sprintsController.getAllSprints)

// Mostrar Sprint por ID
router.get('/:id', sprintsController.getSprintById)

// Crear Sprint 
router.post('/', sprintsController.postSprint)

// Editar Sprint 
router.put('/:id', sprintsController.putSprints)

// Agregar una tarea a un Sprint
router.put('/:id/add-task/:taskId', sprintsController.addTaskToSprint)

// Eliminar Sprint
router.delete('/:id', sprintsController.deleteSprint)

module.exports = router