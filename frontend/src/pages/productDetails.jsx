import { useEffect } from "react"
import { useProductContext } from "../hooks/useProductHook"
import {useParams } from "react-router-dom"

const ProductDetails = () => {
    const {singleProduct,dispatch} = useProductContext()
    const {productId} = useParams()

    
console.log(singleProduct)
    useEffect(()=> { 
        const fetchSingleProduct = async() => {
            
            const response = await fetch(`http://localhost:4000/api/products/${productId}`)
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_SINGLE_PRODUCT' , payload:json})
            }
        }
        fetchSingleProduct()
    } , [dispatch , productId])

    return(
        <div className="productdetail">
            {singleProduct && (
            <>
                <h1>{singleProduct.title}</h1>
                <p>{singleProduct.description}</p>
                <p>{singleProduct.price}</p>
                <p>{singleProduct.createdAt}</p>
            </>
        )}

        </div>
    )
}

export default ProductDetails