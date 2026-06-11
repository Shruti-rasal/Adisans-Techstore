import { useEffect, useState } from "react";
import { getAllOrders, markAsDelivered } from "../../api/orderApi";
import toast from "react-hot-toast";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (error) {
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDeliver = async (id) => {
        try {
            await markAsDelivered(id);
            toast.success("Order marked as delivered");
            setOrders(
                orders.map((o) =>
                    o._id === id ? { ...o, isDelivered: true, deliveredAt: new Date() } : o
                )
            );
        } catch (error) {
            toast.error("Failed to update order");
        }
    };

    const filtered = orders.filter((o) => {
        if (filter === "paid") return o.isPaid;
        if (filter === "unpaid") return !o.isPaid;
        if (filter === "delivered") return o.isDelivered;
        if (filter === "pending") return !o.isDelivered;
        return true;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Loading orders...</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Orders</h1>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {["all", "paid", "unpaid", "delivered", "pending"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${filter === f
                                ? "bg-black text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Items</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Payment</th>
                            <th className="p-4">Delivery</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((order) => (
                            <tr key={order._id} className="border-t hover:bg-gray-50">
                                <td className="p-4 font-mono text-xs text-gray-500">
                                    #{order._id.slice(-6).toUpperCase()}
                                </td>
                                <td className="p-4">
                                    <p className="font-medium">{order.user?.fullname || "N/A"}</p>
                                    <p className="text-xs text-gray-400">{order.user?.email}</p>
                                </td>
                                <td className="p-4 text-gray-600">
                                    {order.orderItems?.length} item(s)
                                </td>
                                <td className="p-4 font-semibold text-cyan-600">
                                    ₹{order.totalPrice}
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${order.isPaid
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {order.isPaid ? "Paid" : "Unpaid"}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${order.isDelivered
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {order.isDelivered ? "Delivered" : "Pending"}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500 text-xs">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    {!order.isDelivered && (
                                        <button
                                            onClick={() => handleDeliver(order._id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                                        >
                                            Mark Delivered
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <p className="text-center py-10 text-gray-500">No orders found</p>
                )}
            </div>
        </div>
    );
}

export default AdminOrders;
