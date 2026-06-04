import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Profile from "./pages/Profile";

import Navbar from "./components/ui/navbar";
import Home from "./pages/Home";
import Products from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Register from "./pages/register";
import Login from "./pages/login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";


function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const exist = cartItems.find((item) => item._id === product._id);

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const decreaseQty = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  return (
    <BrowserRouter>
      <Navbar cartItems={cartItems} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={<Products addToCart={addToCart} cartItems={cartItems} />}
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
              decreaseQty={decreaseQty}
              cartItems={cartItems}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
      </Route>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
