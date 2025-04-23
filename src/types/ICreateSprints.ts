import { ITareas } from "./ITareas"

export interface ICreateSprints {
    nombre: string
    fechaInicio: string
    fechaLimite: string
    tareas: ITareas[]
}