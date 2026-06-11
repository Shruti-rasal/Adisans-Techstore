import { useEffect, useState } from "react";
import { getMyOrders } from "../api/orderApi";
import { Link } from "react-router-dom";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getMyOrders();
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-8">
            <h1 className="text-4xl font-bold mb-8 text-center">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl text-gray-500 mb-4">No orders yet</p>
                    <Link
                        to="/products"
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
                    >
                        Shop Now
                    </Link>
                </div>
            ) : (
                <div className="max-w-5xl mx-auto flex flex-col gap-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-xl shadow-lg p-6"
                        >
                            {/* Order Header */}
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                <div>
                                    <p className="text-sm text-gray-400">Order ID</p>
                                    <p className="font-mono font-semibold">
                                        #{order._id.slice(-8).toUpperCase()}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${order.isPaid
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {order.isPaid ? "Paid" : "Unpaid"}
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${order.isDelivered
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {order.isDelivered ? "Delivered" : "Pending"}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="flex flex-col gap-3 mb-4">
                                {order.orderItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 border-b pb-3"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-contain rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.qty} × ₹{item.price}
                                            </p>
                                        </div>
                                        <p className="font-semibold text-cyan-600">
                                            ₹{item.qty * item.price}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Order Footer */}
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Payment: {order.paymentMethod}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Placed on:{" "}
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <p className="text-xl font-bold text-cyan-600">
                                    Total: ₹{order.totalPrice}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyOrders;
