import React, { useEffect, useState } from 'react';
import '../styles/login.css'
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link} from 'react-router-dom';
function LoginPage() {

  // se crea una constante que almacene las funciones que se usaran en el formulario
  const {
    register,
    handleSubmit, 
    formState: {errors},
  } = useForm()

  // se crea una constante que almacene las funciones que verifican la autenticación
  const {
    logearse,
    estaAutentificado,
    errors: loginErrors,
  } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (estaAutentificado) navigate('/profile')
  }, [estaAutentificado])


  // funcion para "ejecutar" el envio del formulario
  const onSubmit = handleSubmit( async (values) => {
    logearse(values)
  })

  return (
    <div className="container-login">
        <form onSubmit={onSubmit}>
          {
            loginErrors.map((error, index) => (
              <div className='error-login' key={index}>
                {error}
              </div>
            ))
          }
          <div className="titulo-login"><p>Iniciar Sesión</p></div>

          <label htmlFor="nombre_usuario">Nombre de usuario</label>
          <input type="text" placeholder='Ingresa tu nombre de usuario'{... register("nombre_usuario", {required: true})}/>
          {
            errors.nombre_usuario &&
            <p className="error">El nombre de usuario es requerido</p>
          }
          <label htmlFor="contraseña">Contraseña</label>
          <input type="password" placeholder='Ingresa tu contraseña'{... register("contraseña", {required: true})}/>
          {
            errors.contraseña &&
            <p className="error">La contraseña es requerida</p>
          }
          <button type='submit'>Logearse</button>
          <p className='no-account'>
            ¿No tienes cuenta? 
            <Link to="/register">Registrate</Link>
          </p>
        </form>
    </div>
  );
}

export default LoginPage
