import { ITareas } from "./ITareas"


export interface ISprint {
    _id: string ,
    fechaInicio: string,
    fechaLimite: string,
    nombre: string
    tareas: string[]
}