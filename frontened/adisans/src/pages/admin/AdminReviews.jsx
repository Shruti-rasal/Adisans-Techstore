import { useEffect, useState } from "react";
import { getAllReviews } from "../../api/adminApi";
import { deleteReview } from "../../api/reviewApi";
import toast from "react-hot-toast";

function AdminReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const data = await getAllReviews();
            setReviews(data);
        } catch (error) {
            toast.error("Failed to load reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this review?")) return;
        try {
            await deleteReview(id);
            toast.success("Review deleted");
            setReviews(reviews.filter((r) => r._id !== id));
        } catch (error) {
            toast.error("Failed to delete review");
        }
    };

    const renderStars = (rating) => "⭐".repeat(rating);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Loading reviews...</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Reviews</h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Comment</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review._id} className="border-t hover:bg-gray-50">
                                <td className="p-4 font-medium">
                                    {review.product?.name || "N/A"}
                                </td>
                                <td className="p-4">
                                    <p className="font-medium">{review.user?.fullname || "N/A"}</p>
                                    <p className="text-xs text-gray-400">{review.user?.email}</p>
                                </td>
                                <td className="p-4 text-yellow-500">
                                    {renderStars(review.rating)}
                                </td>
                                <td className="p-4 text-gray-600 max-w-xs truncate">
                                    {review.comment}
                                </td>
                                <td className="p-4 text-gray-500 text-xs">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {reviews.length === 0 && (
                    <p className="text-center py-10 text-gray-500">No reviews found</p>
                )}
            </div>
        </div>
    );
}

export default AdminReviews;
