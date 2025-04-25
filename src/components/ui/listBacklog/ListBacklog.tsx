import { Button } from 'react-bootstrap'
import styles from './ListBacklog.module.css'
import { useEffect, useState } from 'react';
import { TareaCard } from '../TareaCard/TareaCard';
import { useStoreModal } from '../../../store/useStoreModal';
import { getAllTareasController } from '../../../data/tareaController';
import useStoreTareas from '../../../store/useStoreTareas';
import { getAllSprintsController } from '../../../data/sprintController';




export const ListBacklog = () => {

  

  const {openModalTask} = useStoreModal()

  //aqui se deberia setear el array de tareas en los estado globales
  const setTareas = useStoreTareas((state) => state.setTareas)

  const {tareas} = useStoreTareas()
  const [arrayIdTareasAsignadas, setArrayIdTareasAsignadas] = useState<string[]>([])



  
  
  
    useEffect(() => {
      
      const firstGetTareas = async () => {
        const tareas = await getAllTareasController();
        setTareas(tareas);
        
      }

      
      firstGetTareas();
      
    }, [])


  

    
    useEffect(() => {
      const fetchSprints = async () => {
        try {
          const fetchedSprints = await getAllSprintsController();
          const tareasAsignadasIds = fetchedSprints.flatMap(sprint => sprint.tareas);

           // Comparar contenido antes de actualizar
          const idsActuales = [...arrayIdTareasAsignadas].sort().join(',');
          const idsNuevos = [...tareasAsignadasIds].sort().join(',');

          if (idsActuales !== idsNuevos) {
            setArrayIdTareasAsignadas(tareasAsignadasIds);
            console.log("Tareas asignadas actualizadas:", tareasAsignadasIds);
          }

        } catch (error) {
          console.error("Error al obtener los sprints:", error);
        }
      };
    
      fetchSprints();
    }, [arrayIdTareasAsignadas]);
    
   

  return (
    <>
    <div className={styles.mainContainer}>
    <h1>Backlog</h1>
    <div className={styles.tasksContainer}>
      <div className={styles.taskContainerHeader}>
    <p>Tareas en el backlog</p>
        
    <Button variant="primary" className={`${styles.btnCustom} ${styles.btnBacklog}`}  onClick={openModalTask}>Crear tarea</Button>
      </div>
    </div>
    <div className={styles.listContainer}>
     

          {tareas.filter(tarea => !arrayIdTareasAsignadas.includes(tarea._id)).map((tarea) => (<TareaCard tarea={tarea} key={tarea._id}></TareaCard>))}
    </div>

      
    
    </div>
    </>

  )
}
