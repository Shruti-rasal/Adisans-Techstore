import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

function Navbar({ cartItems = [] }) {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser && loggedInUser !== "undefined") {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="bg-black text-white px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 rounded-full border-2 border-cyan-400"
          />

          <h1 className="text-2xl font-bold text-cyan-400">
            Adisans TechStore
          </h1>
        </div>

        {/* CENTER */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          <Link to="/">
            <li className="hover:text-cyan-400 cursor-pointer">Home</li>
          </Link>

          <Link to="/products">
            <li className="hover:text-cyan-400 cursor-pointer">Products</li>
          </Link>

          {/* Show only when NOT logged in */}
          {!user && (
            <>
              <Link to="/login">
                <li className="hover:text-cyan-400 cursor-pointer">Login</li>
              </Link>

              <Link to="/register">
                <li className="hover:text-cyan-400 cursor-pointer">Register</li>
              </Link>
            </>
          )}
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* CART */}
          <Link to="/cart">
            <div className="relative cursor-pointer">
              <FaShoppingCart size={24} className="hover:text-cyan-400" />

              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            </div>
          </Link>
          {user?.role === "admin" && (
  <Link
    to="/admin"
    className="block bg-green-600 text-white text-center py-2 rounded mb-2"
  >
    Admin Dashboard
  </Link>
)}
          

          {/* PROFILE */}
          <div className="relative">
            <FaUserCircle
              size={30}
              className="hover:text-cyan-400 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {/* DROPDOWN */}
            {user && showDropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-white text-black rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <h2 className="font-bold text-lg">{user.fullname}</h2>

                  <p className="text-sm text-gray-600 mb-4">{user.email}</p>

                  <Link
                    to="/profile"
                    className="block bg-[#1591DC] text-white text-center py-2 rounded mb-2 hover:opacity-90"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/myorders"
                    className="block bg-[#1591DC] text-white text-center py-2 rounded mb-2 hover:opacity-90"
                  >
                    My Orders
                  </Link>

                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }}
                    className="w-full bg-[#C44545] text-white py-2 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
