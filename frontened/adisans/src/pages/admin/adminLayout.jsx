import { NavLink, Outlet, Navigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

function AdminLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect non-admins away
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const navLinks = [
    { to: "/admin", label: "Dashboard", icon: <FaTachometerAlt />, end: true },
    { to: "/admin/users", label: "Users", icon: <FaUsers /> },
    { to: "/admin/products", label: "Products", icon: <FaBox /> },
    { to: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
    { to: "/admin/reviews", label: "Reviews", icon: <FaStar /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-5 flex flex-col">
        <h1 className="text-2xl font-bold mb-2 text-cyan-400">Admin Panel</h1>
        <p className="text-xs text-gray-400 mb-8">Adisans TechStore</p>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive
                  ? "bg-cyan-500 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
