import { useState } from "react"
import { useUserContext } from "./useUserContext"


export const useLogin =  () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const { dispatch } = useUserContext()

    const login = async (email, password) => {
        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json()
        
        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))
          
            setLoading(false)
            dispatch({type: 'LOGIN' , payload:json})
        }
    }
    return {login, error , loading} 
}