const express = require('express')
const backlogController = require('../controllers/backlogController')
const router = express.Router()


// Mostrar el Backlog
router.get('/', backlogController.getBacklog)

// Crear Backlog
router.post('/', backlogController.postBacklog)

// Agregar una tarea al Backlog
router.put('/add-task/:taskId', backlogController.putBacklog) 


module.exports = router