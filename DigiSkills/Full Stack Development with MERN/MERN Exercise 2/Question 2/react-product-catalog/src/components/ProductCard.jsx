function ProductCard({ product, addToCart }) {

    return (
        <div className="product-card">

            <h2>{product.name}</h2>

            <p>Category: {product.category}</p>

            <p>Price: Rs. {product.price}</p>

            <p>
                Stock: {product.stock > 0 ? "Available" : "Out of Stock"}
            </p>

            <button
                onClick={addToCart}
                disabled={product.stock === 0}
            >
                Add to Cart
            </button>

        </div>
    );
}

export default ProductCard;