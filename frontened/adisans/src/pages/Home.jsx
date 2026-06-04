import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/hero.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="min-h-screen bg-black/30 flex flex-col items-center justify-center text-center px-4">
        <div className="mt-52">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 drop-shadow-lg">
            Welcome to Adisans TechStore
          </h1>

         <p className="text-xl text-white-200 mb-8 drop-shadow-md">
     <span className="bg-[#FFD65A] text-white px-3 py-1 rounded">
      Best Electronics at Affordable Prices
    </span>
    
     </p>

          <Link to="/products">
            <button className="bg-[#FFD65A] hover:bg-cyan-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
