import { useContext } from "react"
import { ProductContext } from "../context/productContext"



export const useProductContext = () => {
    const context = useContext(ProductContext)

    if(!context){
        throw Error('useProductContext must be used inside a productContextProvider')
    }
    return context
}