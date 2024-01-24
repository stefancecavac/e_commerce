import { useEffect } from "react"
import { useProductContext } from "../hooks/useProductHook"
import { useParams } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const ProductDetails = () => {
    const { singleProduct, dispatch } = useProductContext()
    const { productId } = useParams()
    const { user } = useUserContext()
    const navigateTo = useNavigate()
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchSingleProduct = async () => {

            const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_SINGLE_PRODUCT', payload: json })
            }
        }
        fetchSingleProduct()
    }, [dispatch, productId])
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

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % singleProduct.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + singleProduct.images.length) % singleProduct.images.length);
    };

    return (
        <div className="productdetail">
            {singleProduct && (
                <>
                   <div className="slideshow-container">
                        <button onClick={handlePrevImage}>&#10094;</button>
                        <img src={singleProduct.images[currentImageIndex]} alt={`Product ${singleProduct.title}`} />
                        
                        <button onClick={handleNextImage}>&#10095;</button>
                    </div>
                    <p>{currentImageIndex + 1}/{singleProduct.images.length}</p>
                    <h1>{singleProduct.title}</h1>
                    <p>{singleProduct.description}</p>
                    <p>{singleProduct.price} KM</p>
                    <p>{new Date(singleProduct.createdAt).toLocaleDateString()}</p>
                    <p>{singleProduct.userid.email}</p>

                    {user && user._id === singleProduct.userid._id && (
                        <button onClick={handleDelete}>Delete</button>
                    )}
                </>
            )}

        </div>
    )
}

export default ProductDetails