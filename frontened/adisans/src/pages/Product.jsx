import React, { useEffect, useState } from "react";
import ProductCard from "../components/ui/productCard";
import { getProducts } from "../api/productApi";

function Products({ addToCart,cartItems }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen px-8 py-10">

      <h2 className="text-3xl font-bold mb-8 text-center">
        All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {products.map((product) => (
        <ProductCard
  key={product._id}
  product={product}
  addToCart={addToCart}
  cartItems={cartItems}
/>
        ))}

      </div>
    </div>
  );
}

export default Products;