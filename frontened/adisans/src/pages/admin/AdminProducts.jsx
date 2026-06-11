import { useEffect, useState } from "react";
import {
    getAdminProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../api/adminApi";
import toast from "react-hot-toast";

const emptyForm = {
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    countInStock: "",
};

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    const fetchProducts = async () => {
        try {
            const data = await getAdminProducts();
            setProducts(data);
        } catch (error) {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const openAddModal = () => {
        setEditingProduct(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setForm({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            countInStock: product.countInStock,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingProduct) {
                await updateProduct(editingProduct._id, form);
                toast.success("Product updated");
            } else {
                await createProduct(form);
                toast.success("Product added");
            }
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this product?")) return;
        try {
            await deleteProduct(id);
            toast.success("Product deleted");
            setProducts(products.filter((p) => p._id !== id));
        } catch (error) {
            toast.error("Failed to delete product");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Loading products...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                <button
                    onClick={openAddModal}
                    className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                    + Add Product
                </button>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-4">Image</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="border-t hover:bg-gray-50">
                                <td className="p-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-14 h-14 object-contain rounded"
                                    />
                                </td>
                                <td className="p-4 font-medium">{product.name}</td>
                                <td className="p-4 text-gray-500">{product.category}</td>
                                <td className="p-4 font-semibold text-cyan-600">
                                    ₹{product.price}
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${product.countInStock > 0
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {product.countInStock > 0
                                            ? `${product.countInStock} left`
                                            : "Out of Stock"}
                                    </span>
                                </td>
                                <td className="p-4">⭐ {product.rating}</td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => openEditModal(product)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {products.length === 0 && (
                    <p className="text-center py-10 text-gray-500">No products found</p>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">
                            {editingProduct ? "Edit Product" : "Add Product"}
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price (₹)"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                                required
                                min="0"
                            />
                            <textarea
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                                className="border p-3 rounded-lg outline-none focus:border-cyan-500 h-24 resize-none"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Count In Stock"
                                value={form.countInStock}
                                onChange={(e) =>
                                    setForm({ ...form, countInStock: e.target.value })
                                }
                                className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                                required
                                min="0"
                            />

                            <div className="flex gap-3 mt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-60"
                                >
                                    {submitting
                                        ? "Saving..."
                                        : editingProduct
                                            ? "Update Product"
                                            : "Add Product"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-gray-200 text-black py-3 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProducts;
