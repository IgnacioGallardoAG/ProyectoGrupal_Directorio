import '../styles/negocios.css' // los estilos
import '../styles/fonts/fonts.css' // las fuentes
import { useEffect } from 'react'
import { useNegocios} from '../context/negociosContext.jsx'
import NegociosCard from '../components/NegociosCard'

const NegociosPage = () => {
  
  const { mostrarNegocios, negocios } = useNegocios()


  useEffect(() => {
    mostrarNegocios()
  }, [])

  if (negocios.length === 0) {
    return (
      <h1>No hay Negocios</h1>
    )
  }

  return (
    <>
    <div className='container-negocio'>
      <div className='container-left-negocio'></div>
      <div className='container-right-negocio'>
        <p>En la ciudad de Valparaíso, Chile, se abren las puertas a numerosas oportunidades de negocios que ofrecen una variada gama de experiencias para empresarios e inversores.  Aquí, encontrarás una diversidad de oportunidades comerciales, que van desde acogedores restaurantes y tiendas únicas hasta servicios profesionales!!</p>
      </div>
    </div>
    <div className='container-negocios-inside'>
        {negocios.map(negocio => (
          <NegociosCard negocio={negocio} key={negocio._id}/>
        ))}
    </div>
    </>
  )
}


// separo el componente del contenido para una mejor legibilidad

export default NegociosPage