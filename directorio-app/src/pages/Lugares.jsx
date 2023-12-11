import '../styles/lugares.css' 
import '../styles/fonts/fonts.css' 
import { useEffect } from 'react'
import { useLugares} from '../context/lugaresContext.jsx'
import LugaresCard from '../components/LugaresCard.jsx'
const LugaresPage = () => {
  
  const { mostrarLugares, lugares } = useLugares()


  useEffect(() => {
    mostrarLugares()
  }, [])

  if (lugares.length === 0) {
    return (
      <h1>No hay Lugares de interes</h1>
    )
  }

  return (
    <>
    <div className='container-lugar'>
      <div className='container-left-lugar'></div>
      <div className='container-right-lugar'>
        <p>En Valparaíso, Chile, la ciudad costera se destaca como un vibrante centro para emprendedores y visionarios de negocios. Con su pintoresco entorno y rica cultura, Valparaíso invita a explorar un abanico de posibilidades comerciales. Desde restaurantes con encanto y boutiques exclusivas hasta ofertas de servicios profesionales, la ciudad es un lienzo para la innovación y el crecimiento empresarial.</p>
      </div>
    </div>
    <div className='container-lugares-inside'>
        {lugares.map(lugar => (
          <LugaresCard lugar={lugar} key={lugar.id}/>
        ))}
    </div>
    </>
  )
}

export default LugaresPage