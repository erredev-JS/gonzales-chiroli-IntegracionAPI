import axios from "axios"
import { ITareas } from "../types/ITareas"

import { URL_TASKS } from "../utils/constantes"
import Swal from "sweetalert2"
import { ICreateTareas } from "../types/ICreateTareas"

export const searchOne = async (id: string): Promise<ITareas> => {
    try {
        const res = await axios.get(`${URL_TASKS}/${id}`);
        return res.data;
    } catch (error) {
        console.error('Hubo un error al traer la tarea:', error);
        throw new Error('No se pudo obtener la tarea.'); 
    }
};



export const getAllTareasController = async (): Promise<ITareas[]> => {
    try {
        const res = await axios.get(URL_TASKS)
        return res.data // Asegúrate de retornar solo los datos de la respuesta
    } catch (error) {
        console.log("Hubo un error al traer las tareas en getAllTareas")
        throw error // Lanza el error para poder capturarlo si es necesario
    }
}

export const createTareaController = async (tarea: ICreateTareas): Promise<ITareas> => {
    try {
        // Hacemos la petición para crear la tarea
        const response = await axios.post(URL_TASKS, tarea);
        
        // Retornamos la tarea creada (con el _id generado por Mongo)
        return response.data;
    } catch (err) {
        console.error("Error al crear tarea:", err);
        
        // Aquí, podrías lanzar un error, pero nunca dejes la función sin retorno
        throw new Error("Error al crear tarea");  // En caso de error, lanzamos una excepción
    }
};
export const updateTareaController = async (tareaActualizada: ITareas) => {
    try{
    
        const response = axios.put(`${URL_TASKS}/${tareaActualizada._id}`, tareaActualizada)
        return response
      
            Swal.fire({
                title: "Tarea actualizada!",
                text: "",
                icon: "success"
            });
        }catch(err){
        console.log(err)
    }
}
    


export const deleteTareaController = async (idTareaAEliminar: string) => {
    try{
       const response = axios.delete(`${URL_TASKS}/${idTareaAEliminar}`)
       return response
    }catch(error){
        console.log("Hubo un error al eliminar la tarea", error)
    }
}

