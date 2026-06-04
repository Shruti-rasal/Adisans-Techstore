import React from "react";

function Cart({ cartItems, addToCart, decreaseQty }) {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2 className="text-center text-xl">Cart is Empty</h2>
      ) : (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />

                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>

                  <p className="text-gray-600">₹{item.price}</p>

                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="font-semibold">{item.qty}</span>

                    <button
                      onClick={() => addToCart(item)}
                      disabled={item.qty >= item.countInStock}
                      className={`px-3 py-1 rounded ${
                        item.qty >= item.countInStock
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gray-300"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-cyan-500">
                ₹{item.price * item.qty}
              </h2>
            </div>
          ))}

          <div className="flex justify-between items-center mt-8">
            <h2 className="text-3xl font-bold">Total:</h2>

            <h2 className="text-3xl font-bold text-cyan-500">₹{totalPrice}</h2>
          </div>

          <button className="w-full mt-8 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            Proceed To Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
