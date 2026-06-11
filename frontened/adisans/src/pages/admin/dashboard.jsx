import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/adminApi";
import { FaUsers, FaBox, FaShoppingCart, FaRupeeSign } from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: <FaUsers size={28} />,
      color: "bg-blue-500",
    },
    {
      label: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: <FaBox size={28} />,
      color: "bg-green-500",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: <FaShoppingCart size={28} />,
      color: "bg-yellow-500",
    },
    {
      label: "Total Revenue",
      value: `₹${stats?.totalRevenue?.toLocaleString() ?? 0}`,
      icon: <FaRupeeSign size={28} />,
      color: "bg-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">Loading stats...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl shadow p-6 flex items-center gap-5"
          >
            <div className={`${card.color} text-white p-4 rounded-full`}>
              {card.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
