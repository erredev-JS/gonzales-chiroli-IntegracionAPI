import useStoreTareas from '../../../store/useStoreTareas'
import styles from './ModalSendTaskToSprint.module.css'
import useStoreSprints from '../../../store/useStoreSprints'
import { Button } from 'react-bootstrap'
import { useStoreModal } from '../../../store/useStoreModal'
import { useState } from 'react'
import { updateSprintController } from '../../../data/sprintController'

import { bigSweetAlertPopup } from '../../../utils/bigSweetAlertPopup'
import { ISprint } from '../../../types/iSprints'




export const ModalSendTaskToSprint  = () => {

    const {sprints,addTaskToSprint} = useStoreSprints()
    const {tareaActiva, setTareaActiva} = useStoreTareas()
    const {closeModalTaskSend} = useStoreModal()
    const [sprintSeleccionada, setSprintSeleccionada] = useState<string | null>(null) // Estado para seleccionar el sprint
    
    const handleCloseModalSendTask = () => {
        setTareaActiva(null)
        closeModalTaskSend()
    }

    const handleSendTask = async () => {
        if(!sprintSeleccionada || !tareaActiva) return // Si no hay seleccionada una sprint o no hay tarea activa corta el handle

        const sprintUpdate = sprints.find((sprint) => sprint._id === sprintSeleccionada)

        if (!sprintUpdate) return 

        const newSprint = {
            ...sprintUpdate, tareas: [...sprintUpdate.tareas, tareaActiva]
        }

        await updateSprintController(newSprint as ISprint)
        bigSweetAlertPopup("Tarea enviada a la Sprint")


        await addTaskToSprint(tareaActiva, sprintSeleccionada) // Actualizo el estado
        //deleteTareaController(tareaActiva._id)
        setTareaActiva(null)
        
        useStoreTareas.getState().deleteTarea(tareaActiva._id)

        closeModalTaskSend()

    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h3>Enviar {tareaActiva?.titulo} a:</h3>
            </div>
            <div className={styles.containerListSprints}>
                <h5>Sprints</h5>
                {sprints.map((sprint) => (
                    <div key={sprint._id} onClick={() => setSprintSeleccionada(sprint._id)} className={`${styles.containerSprints} ${sprintSeleccionada === sprint._id ? styles.sprintactive : ''}`}>
                        {sprint.nombre}
                    </div>
                ))}
            </div>
            <div className={styles.containerButtons}>
                <Button variant='danger' onClick={handleCloseModalSendTask}>Cerrar</Button>
                <Button variant='success' disabled={!sprintSeleccionada} onClick={handleSendTask}>Aceptar</Button>
            </div>
        </div>
    )
}