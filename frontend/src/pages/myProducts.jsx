import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { useProductContext } from "../hooks/useProductHook"
import { useUserContext } from '../hooks/useUserContext'

import ProductCard from "../components/productCard"




const MyProducts = () => {
    const { products, dispatch } = useProductContext()
    const { user } = useUserContext()

    const [loading, setLoading] = useState(true)



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/userproducts", {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()

                if (response.ok) {
                    dispatch({ type: 'SET_PRODUCTS', payload: json })
                }
            }
            catch (error) {
                console.log('fetch error', error)
            }
            finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [dispatch, user])

    return (
        <div className="home">
            <h1>my products:</h1>
            <div className="homecontent">
                {loading ? (
                    <p> loading ...</p>
                ) : (
                    products && products.map((product) => (
                        <Link key={product._id} to={`/product-details/${product._id}`} ><ProductCard product={product}></ProductCard></Link>
                    ))

                )}
            </div>

        </div>
    )
}

export default MyProducts