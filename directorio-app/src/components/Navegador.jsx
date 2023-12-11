import logo from '../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHome, faShop, faCalendarDays, faMapLocationDot, faArrowRightToBracket, faUser, faDashboard } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import '../styles/navegador.css'

function Navigator() {

  const {estaAutentificado, cerrarSesion, usuario} = useAuth()

  const esAdmin = usuario && usuario.rango === 'administrador'


  return (
    <nav className="containerNavigator">
    <div id="navigation-container">
      <div className="logo">
        <a href="/"><img id="logo" src={logo} alt="Logo" /></a>
      </div>
      <ul>
        <li><Link id="button-rest" to="/"><FontAwesomeIcon icon={faHome} id="iconos-nav" />Inicio</Link></li>
        <li><Link id="button-rest" to="/negocios"><FontAwesomeIcon icon={faShop} id="iconos-nav" />Negocios</Link></li>
        <li><Link id="button-rest" to="/eventos"><FontAwesomeIcon icon={faCalendarDays} id="iconos-nav" />Eventos</Link></li>
        <li><Link id="button-rest" to="/lugares"><FontAwesomeIcon icon={faMapLocationDot} id="iconos-nav" />Lugares de Interés</Link></li>
        
        {estaAutentificado ? (
          <>
            <li>
              <Link id="btn-perfil" to="/profile"><FontAwesomeIcon icon={faUser} id="iconos-nav" />{usuario.nombre}</Link>
            </li>
            {esAdmin && (
              <li>
              <Link id="btn-dashboard" to="/dashboard/negocios"><FontAwesomeIcon icon={faDashboard} id="iconos-nav" />Dashboard</Link>
            </li>
            )}

            <li>
              <Link id="btn-logout" 
                to="/" 
                onClick={() => {cerrarSesion()}
              }>
              <FontAwesomeIcon icon={faArrowRightToBracket} id="iconos-nav" />Cerrar sesion</Link>
            </li>
          </>
        ) : (
          <>
          <li>
            <Link id="button-inicio" to="/login"><FontAwesomeIcon icon={faArrowRightToBracket} id="iconos-nav" />Inicio de Sesión</Link>
          </li>
          </>
        )}
        
      </ul>
    </div>
  </nav>
  );
}

export default Navigator
