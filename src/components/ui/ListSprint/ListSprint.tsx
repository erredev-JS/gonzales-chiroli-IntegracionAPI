import { Button } from "react-bootstrap"
import styles from "./listSprint.module.css"
 
import { useStoreModal } from "../../../store/useStoreModal"

import useStoreSprints from "../../../store/useStoreSprints"

import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { ISprint } from "../../../types/iSprints"

import { CardTaskInSprint } from "../CardTaskInSprint/CardTaskInSprint"
import useStoreTareas from "../../../store/useStoreTareas"
import { searchOne } from "../../../data/tareaController"
import { ITareas } from "../../../types/ITareas"



export const ListSprint = () => {

    const { idsprint } = useParams<{idsprint: string}>()
    
    //con esto se adquiere el id del sprint seleccionado
    

    const [selectedSprint, setSelectedSprint] = useState<ISprint>()
    const {tareas} = useStoreTareas()
    const {sprints, setSprintActiva} = useStoreSprints()
    const {openModalTask} = useStoreModal()
    
    

    const [arrayTareas, setArrayTareas] = useState<ITareas[]>([])
    
    useEffect(() => {
        if (!idsprint || sprints.length === 0) return;
    
        const foundSprint = sprints.find(sprint => sprint._id === idsprint);
    
        if (foundSprint) {
            setSelectedSprint(foundSprint);
            setSprintActiva(foundSprint);
        }
    }, [idsprint, sprints]);
    useEffect(() => {
        const fetchTasks = async () => {
            if (!selectedSprint?.tareas) return;
    
            try {
                const fetchedTasks = await Promise.all(
                    selectedSprint.tareas.map(async task => {
                        try {
                            return await searchOne(task._id);
                        } catch (error) {
                            console.error("Error al cargar la tarea:", error);
                            return null; // Devuelve null en caso de error
                        }
                    })
                );
    
                // Filtra valores nulos y asegura el tipo correcto
                const validTasks = fetchedTasks.filter((task): task is ITareas => task !== null);
                setArrayTareas(validTasks); // Asegura que solo se asignen tareas válidas
            } catch (error) {
                console.error("Error en la carga de tareas:", error);
            }
        };
    
        fetchTasks();
    }, [selectedSprint]);
    
    

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