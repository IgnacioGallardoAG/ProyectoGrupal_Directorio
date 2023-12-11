import axios from '../api/axios.js'


// rutas de eventos
export const mostrarEventos = () => axios.get('/tareas/eventos')
export const mostrarEvento = (id) => axios.get(`/tareas/eventos/${id}`)
export const AgregarEvento = (evento) => axios.post('/tareas/eventos/add', evento)
export const ActualizarEvento = (id, evento) => axios.put(`/tareas/eventos/update/${id}`, evento)
export const EliminarEvento = (id) => axios.delete(`/tareas/eventos/delete/${id}`)