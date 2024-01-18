import { useEffect } from "react"
import {Link} from 'react-router-dom' 

import { useProductContext } from "../hooks/useProductHook"

import ProductCard from "../components/productCard"

const Home = () => {
    const {products , dispatch} = useProductContext()

    useEffect(() => {
        const fetchProducts = async() => {
            const response = await fetch("http://localhost:4000/api/products")
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_PRODUCTS' , payload:json})
            }
        }

        fetchProducts()
    }, [dispatch])

    return(
        <div className="home">
            {products && products.map((product) => (
              <Link  key={product._id} to={`/product-details/${product._id}` } ><ProductCard product={product}></ProductCard></Link>  
            ))}
        </div>
    )
}

export default Home