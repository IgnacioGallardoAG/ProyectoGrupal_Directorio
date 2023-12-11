import axios from '../api/axios.js'


// rutas para reseñas de negocios
export const AgregarReseñaNegocio = (resena) => axios.post('/resenas/add', resena)
export const MostrarReseñasNegocio = () => axios.get('/resenas')
export const MostrarReseñaNegocio = (id) => axios.get(`/resenas/${id}`)

// rutas para reseñas de lugares
export const AgregarReseñaLugar = (resena) => axios.post('/resenas/lugar/add', resena)
export const MostrarReseñasLugar = () => axios.get('/resenas/lugar/mostrar')
export const MostrarReseñaLugar = (id) => axios.get(`/resenas/lugar/${id}`)