import '../styles/negociosDetails.css'

function ResenaCardNegocio({resena}) {
    return (
        <div className='card-resena'>
           <ul>
            <li>Nombre: {resena.usuario.nombre_usuario}</li>
            <li>Comentario: {resena.comentario} </li>
            <li>Calificacion: {resena.calificacion} </li>
            <li>Fecha: {resena.fecha_reseña}</li>
           </ul>
        </div>
    )
}

export default ResenaCardNegocio;