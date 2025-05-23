import { Button } from 'react-bootstrap'
import styles from './ModalSprint.module.css'
import { useStoreModal } from '../../../store/useStoreModal'
import useStoreSprints from '../../../store/useStoreSprints'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ISprint } from '../../../types/iSprints'
import { createSprintController, updateSprintController } from '../../../data/sprintController'
import { bigSweetAlertPopup } from '../../../utils/bigSweetAlertPopup'
import { ICreateSprints } from '../../../types/ICreateSprints'


const ModalSprint = () => {



    
    const { closeModalSprint} = useStoreModal()
    const {setSprintActiva, sprintActiva, addSprint, editSprint} = useStoreSprints()

    const [previusSprinActiva,  setPreviusSprinActiva] = useState<null | ISprint>(null)
    const initialStateSprint : ICreateSprints = {
        fechaInicio : '',
        fechaLimite : '', 
        nombre : '',
        tareas : []
    }
    const [formValues, setFormValues] = useState<ICreateSprints | ISprint>(initialStateSprint) 
    
    
    useEffect(() => {
       if (sprintActiva){
        
        setFormValues({...sprintActiva})
        setPreviusSprinActiva(sprintActiva)
       }else{
        setFormValues(initialStateSprint)
       }
    }, [sprintActiva]);
    

    const handleChange =(e : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormValues((prev) => ({...prev, [`${name}`] : value}))
    }
    
    
    const handleCloseModalSprint = () => {
        if (previusSprinActiva) {
            setSprintActiva({ ...previusSprinActiva }) // Clonamos para forzar actualización
        } else {
            setSprintActiva(null)
        }
    
        closeModalSprint()
    }

    // Funcion para crear / actualizar
    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()

        if(!sprintActiva){
            createSprintController(formValues as ICreateSprints)
            addSprint(formValues as ISprint)
            
        }else{
            updateSprintController(formValues as ISprint)
            bigSweetAlertPopup("Sprint actualizada")
            editSprint(formValues as ISprint)
            
        }
        
        handleCloseModalSprint()
    }


    return(
        <div className={styles.backgroundFilter}>

        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>  
                <h2>{sprintActiva ? 'Editar Sprint' : 'Crear Sprint'}</h2>
            </div>
            <div>
                <form className={styles.containerForm}  onSubmit={handleSubmit} action="">
                    <input type="text" name="nombre" id="" placeholder='Titulo' required value={formValues.nombre} onChange={handleChange} />
                    <label htmlFor="">Fecha Inicio</label>
                    <input type="date" name="fechaInicio" id="" required value={formValues.fechaInicio} onChange={handleChange}/>
                    <label htmlFor="">Fecha Limite</label>
                    <input type="date" name="fechaLimite" id="" placeholder='Fecha Cierre' required value={formValues.fechaLimite} onChange={handleChange}/>
                    <div className={styles.containerButtons}>
                        <Button variant='danger' onClick={handleCloseModalSprint}>Cancelar</Button> 
                        <Button type='submit' variant='success'>Aceptar</Button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default ModalSprint