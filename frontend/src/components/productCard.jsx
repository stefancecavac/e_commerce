const ProductCard = ({ product }) => {
    return (
        <div className="productcard">
            <div className="imgcontainer">

                {product.images && product.images.length > 0 ? (
                    product.images.map((image) => (
                        <img key={image._id} src={image} alt={product.title} />
                    ))
                ) : (
                    <p>No image available</p>
                )}
                
            </div>
            <h1>{product.title}</h1>
            <p>{product.price} KM</p>
        </div>
    );
};

export default ProductCard;
