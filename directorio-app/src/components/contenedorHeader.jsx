const parrafoHeader = "Bienvenido al Directorio de Negocios, tu fuente confiable para descubrir y conectar con una amplia variedad de empresas locales. Nuestra plataforma te ofrece acceso a una vasta red de emprendedores y compañías, desde restaurantes y tiendas minoristas hasta servicios profesionales y más. Explora, encuentra y apoya a las empresas de tu comunidad mientras descubres ofertas exclusivas y valiosa información sobre productos y servicios."
import { Link } from "react-router-dom";
function ContenedorHeader() {
    return (
      <div className="container">
        <div className="container-left">
            <h1>Directorio de Negocios</h1>
            <h3>A tu disposición</h3>
            <p>
              {parrafoHeader}
            </p>
            <div className="container-buttons">
              <a id="btn-verMas" href="/">Ver más</a>
              <Link id="btn-registro" to="/register" >Regístrate</Link>
            </div>      
        </div>
        <div className="container-right"></div>
      </div>
    )
  }
export default ContenedorHeader;