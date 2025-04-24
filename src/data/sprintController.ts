import axios from "axios"

import { URL_SPRINTLIST } from "../utils/constantes"
import { putSprintList } from "../http/crudSprints"
import { ISprint } from "../types/iSprints"
import { ICreateSprints } from "../types/ICreateSprints"



export const getAllSprintsController = async (): Promise<ISprint[]> => {
    try{
        const response = await axios.get(URL_SPRINTLIST)
        console.log("SPrints", response.data)
        return response.data ?? []

    }catch(error){
        console.log("Hubo un error en getAllSprints", error)
        return []
    }
}

export const createSprintController = async (nuevaSprint: ICreateSprints) => {
    try{
        const response = await axios.post(URL_SPRINTLIST, nuevaSprint)
        return response.data
    }catch(error){
        console.log("Hubo un error en createSprintController", error)

    }
}

export const updateSprintController = async (sprintActualizada: ISprint) => {
    try{
        const response = await axios.put(`${URL_SPRINTLIST}/${sprintActualizada._id}`, sprintActualizada)
        return response
    }catch(error){
        console.log("Hubo un error en updateSprintController", error)
    }
}

export const eliminateSprintController = async (idSprintAEliminar: string) => {
    try{
            const response = await axios.delete(`${URL_SPRINTLIST}/${idSprintAEliminar}`)
            return response
    
        }catch(error){
            console.log("Hubo un error al eliminar el Sprint", error)
        }
}
