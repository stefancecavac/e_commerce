
const ProductCard = ({product}) => {

    return(
        <div className="productcard">
            <img src={product.image}></img>
            <h1>{product.title}</h1>
            <p>{product.price} KM</p>
        </div>
    )
}

export default ProductCard