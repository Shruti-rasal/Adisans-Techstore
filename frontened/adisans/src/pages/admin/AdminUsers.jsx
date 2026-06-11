import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUserRole } from "../../api/adminApi";
import toast from "react-hot-toast";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Only super admin can change roles
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const isSuperAdmin = currentUser?.isSuperAdmin === true;

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this user?")) return;
        try {
            await deleteUser(id);
            toast.success("User deleted");
            setUsers(users.filter((u) => u._id !== id));
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    const handleRoleChange = async (id, newRole) => {
        try {
            await updateUserRole(id, newRole);
            toast.success(`Role updated to ${newRole}`);
            setUsers(users.map((u) => (u._id === id ? { ...u, role: newRole } : u)));
        } catch (error) {
            toast.error("Failed to update role");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Loading users...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Users</h1>
                {isSuperAdmin && (
                    <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Super Admin — Role Control Enabled
                    </span>
                )}
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t hover:bg-gray-50">
                                <td className="p-4 font-medium">
                                    {user.fullname}
                                    {user.isSuperAdmin && (
                                        <span className="ml-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                                            Super Admin
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-gray-500">{user.email}</td>
                                <td className="p-4 text-gray-500">{user.phoneNumber}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === "admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4 flex gap-2 flex-wrap">
                                    {/* Role toggle — super admin only, cannot touch other super admins */}
                                    {isSuperAdmin && !user.isSuperAdmin && (
                                        <button
                                            onClick={() =>
                                                handleRoleChange(
                                                    user._id,
                                                    user.role === "admin" ? "user" : "admin"
                                                )
                                            }
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs"
                                        >
                                            {user.role === "admin" ? "Make User" : "Make Admin"}
                                        </button>
                                    )}

                                    {/* Cannot delete super admin */}
                                    {!user.isSuperAdmin && (
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <p className="text-center py-10 text-gray-500">No users found</p>
                )}
            </div>
        </div>
    );
}

export default AdminUsers;
