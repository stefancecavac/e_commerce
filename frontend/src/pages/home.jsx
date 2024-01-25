import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

import { useProductContext } from "../hooks/useProductHook"
import { useUserContext } from '../hooks/useUserContext'

import ProductCard from "../components/productCard"



const Home = () => {
    const { products, dispatch } = useProductContext()
    const { user } = useUserContext()
    const [category, setCategory] = useState('')
    const [status , setStatus] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {

                const response = await fetch(`http://localhost:4000/api/products?category=${category}&status=${status}`, {

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
    }, [dispatch, user, category,status])


    const handleFilterChangeCategory = (event) => {
        setCategory(event.target.value)
    }
    const handleFilterChangeStatus = (event) => {
        setStatus(event.target.value)
    }


    return (
        <div className="home">
            <label>Category:</label>
            <select
                value={category}
                onChange={handleFilterChangeCategory}
            >
                <option value=''>Select category</option>
                {['electronic', 'furniture', 'automotive', 'other'].map(
                    (category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    )
                )}
            </select>
            <label>status:</label>
            <select
                value={status}
                onChange={handleFilterChangeStatus}
            >
                <option value=''>Select category</option>
                {['new', 'used'].map(
                    (status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    )
                )}
            </select>
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

export default Home