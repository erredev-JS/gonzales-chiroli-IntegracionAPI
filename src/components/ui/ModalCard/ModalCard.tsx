import { Button } from 'react-bootstrap'

import styles from './ModalCard.module.css'
import { useStoreModal } from '../../../store/useStoreModal'
import { ITareas } from '../../../types/ITareas'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import useStoreTareas from '../../../store/useStoreTareas'
import { createTareaController, updateTareaController} from '../../../data/tareaController'
import useStoreSprints from '../../../store/useStoreSprints'
import { updateSprintController } from '../../../data/sprintController'
import { bigSweetAlertPopup } from '../../../utils/bigSweetAlertPopup'
import { ICreateTareas } from '../../../types/ICreateTareas'


export const ModalCard = () => {
    

    const {sprintActiva, addTaskToSprint, setSprintActiva, editTaskSprint} = useStoreSprints()
    const {tareaActiva, editTarea, setTareaActiva, addTareaInactiva} = useStoreTareas()
    const {closeModalTask} = useStoreModal()
    
    const initialStateTareaCreate: ICreateTareas = {
        titulo: "",
        descripcion: "",
        estado: "pendiente",  // "pendiente" por defecto
        fechaLimite: "",
    }
    
    const initialStateTareaUpdate: ITareas = {
        _id: "",
        titulo: "",
        descripcion: "",
        estado: "",
        fechaLimite: "",
    }
    
    const [formValues, setFormValues] = useState<ICreateTareas | ITareas>(
        tareaActiva ? { ...tareaActiva } : initialStateTareaCreate
    );
    

    useEffect(()=> {
        if(tareaActiva){
            setFormValues({...tareaActiva})
        }else {
            setFormValues(initialStateTareaCreate); 
        }
    }, [tareaActiva])

    
    
    

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [`${name}`]: value,
        }));
    };
    

    const handleCloseModalTask = () => {
        setTareaActiva(null)
        closeModalTask()
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    
        if (!sprintActiva) {
            if (!tareaActiva) {
                // Crear tarea nueva
                formValues.estado = "pendiente";
                createTareaController(formValues as ICreateTareas)  // Asegúrate de usar la interfaz de creación
                    .then((data) => {
                        console.log("Tarea creada con éxito:", data);
                        addTareaInactiva(data);
                        bigSweetAlertPopup("Tarea creada");
                    })
                    .catch((err) => {
                        console.error("Error al crear tarea:", err);
                    });
            } else {
                // Actualizar tarea existente
                updateTareaController(formValues as ITareas)  // Asegúrate de usar la interfaz de actualización
                    .then(() => {
                        editTarea(formValues as ITareas);
                        bigSweetAlertPopup("Tarea actualizada");
                    })
                    .catch((err) => {
                        console.error("Error al actualizar tarea:", err);
                    });
            }
        } else {
            // Crear tarea dentro de un Sprint
            if (!tareaActiva) {
                console.log("Creando tarea en Sprint activa", sprintActiva.nombre);
                formValues.estado = "pendiente";
                addTaskToSprint(formValues as ITareas, sprintActiva._id);
        
                const sprintActualizado = useStoreSprints
                    .getState()
                    .sprints.find((s) => s._id === sprintActiva._id);
        
                if (sprintActualizado) {
                    setSprintActiva(sprintActualizado);
                    updateSprintController(sprintActualizado);
                    bigSweetAlertPopup("Tarea creada en la Sprint");
                }
            } else {
                editTaskSprint(formValues as ITareas, sprintActiva._id);
                const sprintActualizado = useStoreSprints
                    .getState()
                    .sprints.find((s) => s._id === sprintActiva._id);
        
                if (sprintActualizado) {
                    setSprintActiva(sprintActualizado);
                    updateSprintController(sprintActualizado);
                    bigSweetAlertPopup("Tarea actualizada");
                }
            }
        }
    
        setTareaActiva(null);
        closeModalTask();
    };
    
    return(
        <div className={styles.backgroundFilter}>
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>  
                    <h2>{tareaActiva? "Editar Tarea" : "Crear Tarea"}</h2>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className={styles.containerForm} action="">
                        <input type="text" name="titulo" id="" placeholder='Titulo' required value={formValues.titulo}
                        onChange={handleChange}/>

                        <textarea name="descripcion" id="" placeholder='Descripcion' required value={formValues.descripcion}
                        onChange={handleChange} />
                    
                        <label htmlFor="">Fecha Limite</label>
                        <input type="date" name="fechaLimite" id="" placeholder='Fecha Limite' required value={formValues.fechaLimite}
                        onChange={handleChange}/>

                    
                        <div className={styles.containerButtons}>
                            <Button variant='danger' onClick={handleCloseModalTask}>Cancelar</Button> 
                            <Button type='submit' variant='success'>Aceptar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

