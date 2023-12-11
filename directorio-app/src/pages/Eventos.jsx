import React, { useEffect } from 'react';
import '../styles/eventos.css'
import {useEventos} from '../context/eventosContext.jsx'
import EventosCard from '../components/eventosCard'


const EventosPage = () => {
  
  const { mostrarEventos, eventos } = useEventos()


  useEffect(() => {
    mostrarEventos()
  }, [])

  if (eventos.length === 0) {
    return (
      <h1>No hay Eventos</h1>
    )
  }

  return (
    <>
      <div className='container-evento'>
        <div className='container-left-evento'>
        </div>
        <div className='container-right-evento'>
          <p className = "descripción_sección">La sección de eventos es un lugar especial dedicado a la celebración de diversas actividades y acontecimientos que pueden ser de tu interés. Aquí, te invitamos a explorar un amplio catálogo de eventos que abarcan una variedad de temas, desde conciertos, exhibiciones artísticas, conferencias educativas, hasta ferias y festivales locales. Cualquiera que sea tu pasión o área de interés, seguramente encontrarás eventos emocionantes y entretenidos que se adaptarán a tus preferencias.</p>
        </div>
      </div>
      <div className='container-eventos-inside'>
        {eventos.map((evento) => (
          <EventosCard evento={evento} key={evento._id}/>
        ))}
      </div>
    </>
  )
}

export default EventosPage