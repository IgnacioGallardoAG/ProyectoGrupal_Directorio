
import React from 'react'
import Navegador from './components/Navegador.jsx'
import Home from './pages/Home.jsx'
import Negocios from './pages/Negocios.jsx'
import Eventos from './pages/Eventos.jsx'
import Lugares from './pages/Lugares.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/login.jsx'
import Registro from './pages/Registro.jsx'
import Error404 from './pages/404.jsx'
import Perfil from './pages/Perfil.jsx'
import RutasProtegidas from './RutasProtegidas.jsx'
import RutaDashboard from './dashboardProtegido.jsx'
import NegocioDetails from './components/negociosDetail.jsx'
import EventoDetails from './components/eventosDetail.jsx'
import LugaresDetails from './components/lugaresDetail.jsx'
import {Route, Routes, Navigate} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { NegociosProvider } from './context/negociosContext.jsx'
import { LugaresProvider } from './context/lugaresContext.jsx'
import { EventosProvider } from './context/eventosContext.jsx'
import EventosDashboard from './components/dashboard/eventosDashboard.jsx'
import AddEventos from './components/dashboard/tasks/addEventos.jsx'
import EditEventos from './components/dashboard/tasks/editEventos.jsx'
import NegociosDashboard from './components/dashboard/negociosDashboard.jsx'
import LugaresDashboard from './components/dashboard/lugaresDashboard.jsx'
import AddNegocio from './components/dashboard/tasks/addNegocio.jsx'
import EditNegocio from './components/dashboard/tasks/editNegocio.jsx'
import AddLugar from './components/dashboard/tasks/addLugar.jsx'
import EditLugar from './components/dashboard/tasks/editLugar.jsx'
import { ResenasProvider } from './context/resenasContext.jsx'
import './app.css'



function App() {
  return (
    <div className="App">   
      <div className="content">
        <AuthProvider>
          <LugaresProvider>
          <NegociosProvider>
          <EventosProvider>
          <ResenasProvider>
            <BrowserRouter>
              <Navegador/>
              <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/negocios' element={<Negocios/>}></Route>
                <Route path='/negocios/:id' element={<NegocioDetails/>}></Route>
                <Route path='/eventos/:id' element={<EventoDetails/>}></Route>  {/**recordar que sin esta linea no hay ruta para eventosDetail */}
                <Route path='/eventos' element={<Eventos/>}></Route>
                <Route path='/lugares/:id' element={<LugaresDetails/>}></Route>
                <Route path='/lugares' element={<Lugares/>}></Route>
                <Route path='/lugares/:id' element={<LugaresDetails/>}></Route>
                <Route path='/register' element={<Registro/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path="/404" element={<Error404 />} />
                <Route path="*" element={<Navigate to="/404"/>}/>
                <Route element={<RutasProtegidas/>}>
                  <Route path='/profile' element={<Perfil/>}></Route>
                </Route>
                <Route element={<RutaDashboard />}>
                  <Route path='/dashboard/negocios' element={<NegociosDashboard/>}></Route>
                  <Route path='/dashboard/negocios/add' element={<AddNegocio/>}></Route>
                  <Route path='/dashboard/negocios/edit/:id' element={<EditNegocio/>}></Route>
                  <Route path='/dashboard/eventos' element={<EventosDashboard/>}></Route>
                  <Route path='/dashboard/eventos/add' element={<AddEventos/>}></Route>
                  <Route path='/dashboard/eventos/edit/:id' element={<EditEventos/>}></Route>
                  <Route path='/dashboard/lugares' element={<LugaresDashboard/>}></Route>
                  <Route path='/dashboard/lugares/add' element={<AddLugar/>}></Route>
                  <Route path='/dashboard/lugares/edit/:id' element={<EditLugar/>}></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </ResenasProvider>
          </EventosProvider>
          </NegociosProvider>
          </LugaresProvider>
        </AuthProvider>
      </div>
      <Footer/>
    </div>
  )
}

export default App
