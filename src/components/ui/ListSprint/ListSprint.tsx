import { Button } from "react-bootstrap"
import styles from "./listSprint.module.css"
 
import { useStoreModal } from "../../../store/useStoreModal"

import useStoreSprints from "../../../store/useStoreSprints"

import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { ISprint } from "../../../types/iSprints"

import { CardTaskInSprint } from "../CardTaskInSprint/CardTaskInSprint"
import useStoreTareas from "../../../store/useStoreTareas"



export const ListSprint = () => {

    const { idsprint } = useParams<{idsprint: string}>()
    
    //con esto se adquiere el id del sprint seleccionado
    

    const [selectedSprint, setSelectedSprint] = useState<ISprint>()
    const {tareas} = useStoreTareas()
    const {sprints, setSprintActiva} = useStoreSprints()
    const {openModalTask} = useStoreModal()
    
    //Ya no es necesario
    // useEffect(() => {
    //     if (!sprintActiva && sprints.length > 0) {
    //         setSprintActiva(sprints[0]); 
    //     }
    // }, [sprints]); 
    
    // useEffect(() => {
    //     if(idsprint && sprints.length > 0){
    //         const foundSprint = sprints.find((sprint) => sprint.id === idsprint)
    //         if(foundSprint){
    //             setSelectedSprint(foundSprint)
    //         }
    //     }

    // }, [sprintActiva, idsprint]);
    useEffect(() => {
        if (!idsprint || sprints.length === 0) return;
    
        const foundSprint = sprints.find(sprint => sprint._id === idsprint);
    
        if (foundSprint) {
            setSelectedSprint(foundSprint);
            setSprintActiva(foundSprint);
        }
    }, [idsprint, sprints]);

    const pendingTasks = selectedSprint?.tareas.filter(task => task.estado === 'pendiente') || []
    const inProgress = selectedSprint?.tareas.filter(task => task.estado === 'en_progreso') || []
    const completed = selectedSprint?.tareas.filter(task => task.estado === 'finalizada') || []

    return (
        <div className={styles.containerPrincipal}>

            <div className={styles.containerTitle}>
                <h2>Tareas de la {selectedSprint?.nombre}</h2>
                <div className={styles.containerButton}>
                    <Button onClick={openModalTask} className={`${styles.btnCustom}`}>Crear Tarea</Button>
                </div>
            </div>

            <div className={styles.containercontentFlex}>

                <div className={styles.containerContentTasks}>
                    <h6>Tareas Pendientes : {pendingTasks.length}</h6>
                    <div className={styles.containerTasks}>                       
                    {selectedSprint?.tareas.map(task => {
                        const matchedTask = tareas.find(tarea => tarea._id === task._id);
                        return matchedTask ? (
                        <CardTaskInSprint key={task._id} tarea={matchedTask} estado="pendiente" />
                        ) : null; // Si no hay coincidencia no renderiza nada
                    })}
                    </div>
                </div>


                <div className={styles.containerContentTasks}>
                    
                    <h6>Tareas en Progreso : {inProgress.length}</h6>
                    <div className={styles.containerTasks}>
                    {selectedSprint?.tareas.map(task => {
                            const matchedTask = tareas.find(tarea => tarea._id === task._id)
                            return matchedTask ? (
                                <CardTaskInSprint key={task._id} tarea={matchedTask} estado="en_progreso"/>
                            ): null 
                    })}
                    </div>
                </div>

                <div className={styles.containerContentTasks}>
                    <h6>Tareas Finalizadas : {completed.length}</h6>
                    <div className={styles.containerTasks}>
                    {selectedSprint?.tareas.map(task => {
                        const matchedTask = tareas.find(tarea => tarea._id === task._id)
                        return matchedTask ? (
                            <CardTaskInSprint key={task._id} tarea={matchedTask} estado="finalizada"/>
                            ): null 
                    })}
                    </div>  
                </div>

            </div>
        </div>
    )
}