import { useEffect } from "react"
import { Link } from 'react-router-dom'

import { useProductContext } from "../hooks/useProductHook"
import{useUserContext} from '../hooks/useUserContext'

import ProductCard from "../components/productCard"

import Category from "../components/category"

const Home = () => {
    const { products, dispatch } = useProductContext()
    const {user} = useUserContext()

    

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://localhost:4000/api/products" , {
               
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json })
            }
        }

        fetchProducts()
    }, [dispatch , user])


   

    return (
        <div className="home">

            <div className="homecategory">
                <Category></Category>
            </div>
            <hr></hr>

            <div className="homecontent">

                {products && products.map((product) => (
                    <Link key={product._id} to={`/product-details/${product._id}`} ><ProductCard product={product}></ProductCard></Link>
                ))}
            </div>

        </div>
    )
}

export default Home