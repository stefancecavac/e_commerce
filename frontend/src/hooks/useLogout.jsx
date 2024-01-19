import { useProductContext } from "./useProductHook"
import { useUserContext } from "./useUserContext"

 
export const UseLogout = () => {
    const {dispatch} = useUserContext()
    const {dispatch: userDispatch} = useProductContext()

    const logout = async() => {

        localStorage.removeItem('user')

        dispatch({type:'LOGOUT'})
        userDispatch({type: 'SET_PRODUCTS' , payload: null})

    }
    return {logout}
}

