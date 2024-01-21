import { useEffect } from "react"
import { useProductContext } from "../hooks/useProductHook"
import {useParams } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import { useNavigate } from "react-router-dom"

const ProductDetails = () => {
    const {singleProduct,dispatch} = useProductContext()
    const {productId} = useParams()
    const{user} = useUserContext()
    const navigateTo = useNavigate()
    
    useEffect(()=> { 
        const fetchSingleProduct = async() => {
            
            const response = await fetch(`http://localhost:4000/api/products/${productId}`,{
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_SINGLE_PRODUCT' , payload:json})
            }
        }
        fetchSingleProduct()
    } , [dispatch , productId])
    console.log(singleProduct)


    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/userproducts/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            })

            if (response.ok) {
                dispatch({ type: 'DELETE_PRODUCT', payload: productId })
                navigateTo('/')
                window.location.reload()
            } else {
                const json = await response.json()
                console.error(`Failed to delete product: ${json.message}`)
            }
        } catch (error) {
            console.error('Error during product deletion:', error)
        }
    }

    return(
        <div className="productdetail">
            {singleProduct && (
            <>
                <h1>{singleProduct.title}</h1>
                <p>{singleProduct.description}</p>
                <p>{singleProduct.price}</p>
                <p>{singleProduct.createdAt}</p>
             
                <p>{singleProduct.userid.email}</p>

    



                {user._id === singleProduct.userid._id && (
                    <button onClick={handleDelete}>Delete</button>
                )}
            </>
        )}

        </div>
    )
}

export default ProductDetails