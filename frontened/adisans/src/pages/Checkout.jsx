import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/orderApi";
import toast from "react-hot-toast";

function Checkout({ cartItems, clearCart }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [form, setForm] = useState({
        address: "",
        city: "",
        postalCode: "",
        country: "India",
    });
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [submitting, setSubmitting] = useState(false);

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    if (!user) {
        navigate("/login");
        return null;
    }

    if (cartItems.length === 0) {
        navigate("/cart");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const orderData = {
            orderItems: cartItems.map((item) => ({
                product: item._id,
                name: item.name,
                image: item.image,
                price: item.price,
                qty: item.qty,
            })),
            shippingAddress: form,
            paymentMethod,
            totalPrice,
        };

        try {
            await createOrder(orderData);
            toast.success("Order placed successfully!");
            clearCart();
            navigate("/myorders");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to place order"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                {/* LEFT — Form */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-5">Shipping Details</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Street Address"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                            className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Postal Code"
                            value={form.postalCode}
                            onChange={(e) =>
                                setForm({ ...form, postalCode: e.target.value })
                            }
                            className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            value={form.country}
                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                            className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                            required
                        />

                        <h2 className="text-xl font-semibold mt-2">Payment Method</h2>

                        <div className="flex flex-col gap-3">
                            {["COD", "UPI", "Card"].map((method) => (
                                <label
                                    key={method}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${paymentMethod === method
                                            ? "border-cyan-500 bg-cyan-50"
                                            : "border-gray-200"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={method}
                                        checked={paymentMethod === method}
                                        onChange={() => setPaymentMethod(method)}
                                    />
                                    <span className="font-medium">{method}</span>
                                </label>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mt-4 disabled:opacity-60"
                        >
                            {submitting ? "Placing Order..." : "Place Order"}
                        </button>
                    </form>
                </div>

                {/* RIGHT — Order Summary */}
                <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
                    <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>

                    <div className="flex flex-col gap-3 mb-6">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-3 border-b pb-3"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-14 h-14 object-contain rounded"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {item.qty} × ₹{item.price}
                                    </p>
                                </div>
                                <p className="font-semibold text-cyan-600">
                                    ₹{item.qty * item.price}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-cyan-600">₹{totalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
