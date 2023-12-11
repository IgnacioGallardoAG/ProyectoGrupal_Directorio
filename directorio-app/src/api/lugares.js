import axios from "./axios.js"

// consultas http de lugares
export const consultaLugares = () => axios.get(`/lugares/mostrar`)
export const consultaLugar = (id) => axios.get(`/lugares/mostrar/${id}`)
