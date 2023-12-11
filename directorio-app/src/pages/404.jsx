import '../styles/404.css'
import {Link} from 'react-router-dom'


const Error404 = () => {
     return (
          <div id="error">
          <h1>Error 404</h1>
          <p>La página que buscas no existe.</p>
          <Link to="/">Ve al Inicio</Link>
          </div>
     )
   }
export default Error404