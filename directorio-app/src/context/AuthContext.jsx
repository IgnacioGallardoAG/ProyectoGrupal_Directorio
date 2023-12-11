import {createContext, useState, useContext, useEffect} from 'react'
import { consultaRegistro, consultaLogin, verificarToken } from '../api/auth.js'
import Cookies from 'js-cookie'

// El contexto proporciona una forma de pasar datos a través de los componenetes (como un token de autenticación)

export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider') // generado automaticamente por tabnine
    }
    return context
}
export const AuthProvider = ({children}) => {

    //los hooks son las funciones que se ejecutan en cada componente
    const [usuario, setUsuario] =  useState(null)
    const [estaAutentificado, setEstaAutentificado] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    
    const registrarse = async (usuario) => {
        try {
            const respuesta = await consultaRegistro(usuario)
            console.log(respuesta.data)
            setUsuario(respuesta.data)
            setEstaAutentificado(true) 
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const logearse = async (user) => {
        try {
            const respuesta = await consultaLogin(user)
            console.log(respuesta)
            setEstaAutentificado(true)
            setUsuario(respuesta.data)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const cerrarSesion = async () => {
        Cookies.remove("token")
        setEstaAutentificado(false)
        setUsuario(null)
    }


    // usamos el hook de useEffect para que se ejecuten cada vez que el componente se renderiza
    // para este caso se crea para que ejecute un contador para que elimine los errores una vez sea ejecutado
    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function chequearLogin() {
            const cookies = Cookies.get()
            
            console.log(cookies)
            if(!cookies.token){
                setEstaAutentificado(false)
                setLoading(false)
                return setUsuario(null)
            }
                try {
                    const respuesta = await verificarToken(cookies.token)
                    if(!respuesta.data) {
                        setEstaAutentificado(false)
                        setLoading(false)
                        return
                    }
                    setEstaAutentificado(true)
                    setUsuario(respuesta.data)
                    setLoading(false)
                } catch (error) {
                    console.log(error)
                    setEstaAutentificado(false)
                    setUsuario(null)
                    setLoading(false)
                }
        }
        chequearLogin()
    }, [])


    return (

        // aqui se exportan las funciones creadas en el authcontext
        <AuthContext.Provider value={{
            cerrarSesion,
            loading,
            logearse,
            registrarse,
            usuario,
            estaAutentificado,
            errors,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

