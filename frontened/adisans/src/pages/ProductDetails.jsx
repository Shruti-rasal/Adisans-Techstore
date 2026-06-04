import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/productApi";

function ProductDetails({ addToCart, decreaseQty, cartItems }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const cartItem = cartItems.find(
    (item) => String(item._id) === String(id)
  );

  const qty = cartItem ? cartItem.qty : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-8">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 grid md:grid-cols-2 gap-10">

        {/* Image */}
        <div className="w-full h-[500px] bg-white flex items-center justify-center rounded-lg overflow-hidden">

          <img
            src={`http://localhost:5173${product.image}`}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />

        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            {product.description}
          </p>

          <h2 className="text-3xl font-bold text-cyan-500 mb-4">
            ₹{product.price}
          </h2>

          <p className="text-yellow-500 text-lg mb-4">
            ⭐ {product.rating}
          </p>

          <p className="mb-6 text-gray-700">
            {product.numReviews} Reviews
          </p>

          <p
            className={`font-semibold mb-6 ${
              product.countInStock > qty
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {product.countInStock > qty
              ? `${product.countInStock - qty} Items In Stock`
              : "Out Of Stock"}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 mb-6">

            <button
              onClick={() => decreaseQty(product._id)}
              disabled={qty === 0}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              -
            </button>

            <span className="text-xl font-semibold">
              {qty}
            </span>

            <button
              onClick={() => addToCart(product)}
              disabled={qty >= product.countInStock}
              className={`px-4 py-2 rounded text-white ${
                qty >= product.countInStock
                  ? "bg-red-500 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {qty >= product.countInStock
                ? "Out Of Stock"
                : "+"}
            </button>

          </div>

          {/* Main Button */}
          <button
            onClick={() => {
              if (qty > 0) {
                navigate("/cart");
              } else {
                addToCart(product);
              }
            }}
            disabled={product.countInStock === 0}
            className={`w-full py-3 rounded-lg text-white text-lg transition duration-300 ${
              product.countInStock > 0
                ? "bg-black hover:bg-gray-800"
                : "bg-red-500 cursor-not-allowed"
            }`}
          >
            {product.countInStock === 0
              ? "Out Of Stock"
              : qty > 0
              ? "Go To Cart"
              : "Add To Cart"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;