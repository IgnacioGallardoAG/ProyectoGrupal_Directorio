import React, { Component, useEffect } from 'react'
import '../styles/register.css'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
function RegisterPage() {

  // se crea una constante que almacene las funciones que se usaran en el formulario
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()
  
  // se crea una constante que almacene las funciones que verifican la autenticación
  const {
    registrarse,
    estaAutentificado,
    errors: registerErrors,
  } = useAuth()


  const navigate = useNavigate()

  useEffect(() => {
    if (estaAutentificado) navigate('/profile')
  }, [estaAutentificado]) //

  const onSubmit = handleSubmit( async (values) => {
    registrarse(values)
  })

  return(
    <div className="container-register">
        <form onSubmit={onSubmit}>
          {
            registerErrors.map((error, index) => (
              <div className='error-register' key={index}>
                {error}
              </div>
            ))
          }
          <div className='container-form-title'><p>Registro de Usuarios</p></div>
          <label htmlFor="nombre_usuario">Nombre de usuario</label>
          <input type="text" placeholder='Ingresa tu nombre de usuario'{... register("nombre_usuario", {required: true})}/>
          {
            errors.nombre_usuario &&
            <p className="error">El nombre de usuario es requerido</p>
          }

          <label htmlFor="correo_usuario">Correo Electronico</label>
          <input type="email" placeholder='Ingresa tu correo electronico'{... register("correo_usuario", {required: true})}/>
          {
            errors.correo_usuario &&
            <p className="error">El correo electronico es requerido</p>
          }

          <label htmlFor="contraseña">Contraseña</label>
          <input type="password" placeholder='Ingresa tu contraseña'{... register("contraseña", {required: true})}/>
          {
            errors.contraseña &&
            <p className="error">La contraseña es requerida</p>
          }
          <div className='container-btn'>
            <button type='submit'>Registrar</button>
            <Link to="/login">Ir al login</Link>
          </div>
        </form>
    </div>
  )
}

export default RegisterPage;
