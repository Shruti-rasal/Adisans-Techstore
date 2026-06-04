import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, addToCart, cartItems }) {
  const cartItem = cartItems.find(
  (item) => item._id === product._id
);

const remainingStock =
  product.countInStock - (cartItem?.qty || 0);
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition duration-300">
        {/* Product Image */}

        <div className="w-full h-64 overflow-hidden rounded-t-xl bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Product Name */}
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

          {/* Description */}
          <p className="text-gray-600 mb-3">{product.description}</p>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-cyan-500">
              ₹{product.price}
            </span>

            <span className="text-yellow-500 font-semibold">
              ⭐ {product.rating}
            </span>
          </div>

          {/* Reviews */}
          <p className="text-sm text-gray-500 mb-4">
            {product.numReviews} Reviews
          </p>

          {/* Stock */}
          <p
            className={`mb-4 font-medium ${
              product.countInStock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
          {remainingStock > 0
  ? "In Stock"
  : "Out Of Stock"}
          </p>

          {/* Button */}
         <button
  onClick={() => addToCart(product)}
  disabled={remainingStock <= 0}
  className={`w-full py-2 rounded text-white ${
    remainingStock > 0
      ? "bg-black hover:bg-gray-800"
      : "bg-red-500 cursor-not-allowed"
  }`}
>
  {remainingStock > 0
    ? "Add To Cart"
    : "Out Of Stock"}
</button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
