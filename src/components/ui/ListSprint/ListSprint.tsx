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
                    selectedSprint.tareas.map(async idTask => {
                        try {
                            return await searchOne(idTask);
                        } catch (error) {
                            console.error("Error al cargar la tarea:", error);
                            return null; // Devuelve null en caso de error
                        }
                    })
                );
    
                // Filtra valores nulos y asegura el tipo correcto
                const validTasks = fetchedTasks.filter((task): task is ITareas => task !== null);
                console.log(selectedSprint.tareas)
                setArrayTareas(validTasks); // Asegura que solo se asignen tareas válidas
            } catch (error) {
                console.error("Error en la carga de tareas:", error);
            }
        };
    
        fetchTasks();
    }, [selectedSprint]);
    
    

    const pendingTasks = arrayTareas?.filter(task => task.estado === 'pendiente') || []
    const inProgress = arrayTareas?.filter(task => task.estado === 'en_progreso') || []
    const completed = arrayTareas?.filter(task => task.estado === 'finalizada') || []

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
    {pendingTasks.map(task => (
      <CardTaskInSprint key={task._id} tarea={task} estado="pendiente" />
    ))}
  </div>
</div>

<div className={styles.containerContentTasks}>
  <h6>Tareas en Progreso : {inProgress.length}</h6>
  <div className={styles.containerTasks}>
    {inProgress.map(task => (
      <CardTaskInSprint key={task._id} tarea={task} estado="en_progreso" />
    ))}
  </div>
</div>

<div className={styles.containerContentTasks}>
  <h6>Tareas Finalizadas : {completed.length}</h6>
  <div className={styles.containerTasks}>
    {completed.map(task => (
      <CardTaskInSprint key={task._id} tarea={task} estado="finalizada" />
    ))}
  </div>
</div>

            </div>
        </div>
    )
}