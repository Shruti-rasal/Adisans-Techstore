import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-5">

        <h1 className="text-2xl font-bold mb-8">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-4">

          <Link to="/admin">Dashboard</Link>

          <Link to="/admin/users">Users</Link>

          <Link to="/admin/products">Products</Link>

          <Link to="/admin/orders">Orders</Link>

          <Link to="/admin/reviews">Reviews</Link>

        </div>

      </div>

      {/* Page Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;