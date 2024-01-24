const ProductCard = ({ product }) => {
    return (
        <div className="productcard">
           {product.images && product.images.length>0 ? (<img src={product.images[0]}></img> ) : (   <div className="imagep">no images available</div>) }

         <h1>{product.title}</h1>
            <p>{product.price} KM</p>
        </div>
    );
};

export default ProductCard;
