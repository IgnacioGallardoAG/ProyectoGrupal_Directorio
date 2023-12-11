import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from '../api/axios.js'

function NegociosCard({negocio}) {

    const [imagenURL, setImagenURL] = useState('');

    useEffect(() => {
        // Hacer una solicitud al servidor para obtener la URL de la imagen
        axios.get(`http://localhost:4000/imagenes/getNegocioURL/${negocio.id}`)
          .then(response => {
            setImagenURL(response.data);
          })
          .catch(error => {
            console.error('error al obtener el url la imagen', error);
          });
      }, [negocio.id]);

    return (
            <div className="negocio-card">
            <p id="title-card">{negocio.nombre}</p>
            <img id="img-card" src={`http://localhost:4000${imagenURL}`}/>
            <p><b>Descripcion:</b> {negocio.descripcion}</p>
            <div className="container-btn-negocio">
              <Link id="btn-negocio" to={`/negocios/${negocio.id}`}>Ver más</Link>
            </div>
            </div>
    )
}

export default NegociosCard;