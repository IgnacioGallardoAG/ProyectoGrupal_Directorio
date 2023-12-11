import imgContenedor_1 from '../assets/images/lasebastiana.jpg'
import imgContenedor_2 from '../assets/images/restaurantmaralegre.jpg'
import imgContenedor_3 from '../assets/images/villa-victoria.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faShop, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function HomeComponents() {
    return (
        <>
            <ContenedorAbout/>
            <ContenedorRecomendaciones/>
        </>
    )
}
function ContenedorAbout() {
    return (
      <div className="container-about">
          <h1 className="titulo-about">
          ¿Qué encuentras aquí?
          </h1>
          <p>
            En esta pagina WEB encontraras diversas necesidades dentro de la zona de valparaiso.
            <br></br>Necesidades culturales,gastronomicas, ritmicas,etc. <br></br>Las cuales las encuentras aqui.
          </p>
          <div className="container-inside-about">
            <div className="minicontainer">
              <FontAwesomeIcon icon={faShop} className="iconos"/>
              <h4>Negocios</h4>
              <p>Negocios dentro de la zona de Valparaiso.</p>
            </div>
            <div className="minicontainer">
            <FontAwesomeIcon icon={faCalendarDays} className="iconos"/>
              <h4>Eventos</h4>
              <p>Eventos dentro de la zona de Valparaiso.</p>
            </div>
            <div className="minicontainer">
            <FontAwesomeIcon icon={faMapLocationDot} className="iconos"/>
              <h4>Lugares</h4>
              <p>Lugares dentro de la zona de Valparaiso.</p>
            </div>
  
          </div>
      </div>
    )
  }
  
function ContenedorRecomendaciones() {
    return (
      <div className="container-recomendations">
        <h1 className="titulo-about">
          Algunas recomendaciones...
          </h1>
          <p>
            Sitios interesantes y listos para ser descubiertos dentro de la zona Valparaiso, alguno de estos son...
          </p>
  
          <div className="contenedor-carrusel">
            <div className="carrusel-item ">
              <img src={imgContenedor_1}></img>
              <div className="container-bottom">
                <p>
                <b>La Sebastiana</b> <br/>Es una de las tres casas del famoso poeta chileno Pablo Neruda, ubicada en Valparaíso, Chile. 
                </p>
              </div>
            </div>
            <div className="carrusel-item">
              <img src={imgContenedor_2}></img>
              <div className="container-bottom">
                <p>
                <b>Maralegre</b> <br/>Platos del mar y un ambiente temático lo posiciona como un establecimiento gastronómico ubicado en Valparaiso,Chile.
                </p>
              </div>
            </div>
            <div className="carrusel-item">
              <img src={imgContenedor_3}></img>
              <div className="container-bottom">
                <p>
                <b>Villa Victoria</b><br/>Es una casa de patrimonio cultural en Valparaíso, conocida por su arquitectura única y su importancia en la historia local.
                </p>
              </div>
            </div>
          </div>
      </div>
    )
}
