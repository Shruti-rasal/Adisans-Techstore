import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getMyOrders } from "../api/orderApi";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingOrders(false);
      }
    };
    if (user) fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter((o) => o.isDelivered).length;
  const pendingOrders = orders.filter((o) => !o.isDelivered).length;

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5001/api/v1/user/profile/update",
        { fullname, email, phoneNumber },
        { withCredentials: true }
      );

      toast.success("Profile Updated Successfully");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-[#831C91] mb-2">
          Welcome {user?.fullname}
        </h1>
        <p className="text-gray-600 mb-8">Manage your profile</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT — Update Profile */}
          <div>
            <h2 className="text-2xl font-semibold mb-5">Update Profile</h2>

            <form onSubmit={updateProfileHandler} className="flex flex-col gap-5">
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Full Name"
                className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                required
              />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) setPhoneNumber(value);
                }}
                placeholder="Phone Number"
                className="border p-3 rounded-lg outline-none focus:border-cyan-500"
                required
              />
              <button
                type="submit"
                className="bg-[#831C91] text-white py-3 rounded-lg hover:opacity-90"
              >
                Update Profile
              </button>
            </form>
          </div>

          {/* RIGHT — Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>

            {loadingOrders ? (
              <p className="text-gray-400">Loading orders...</p>
            ) : (
              <div className="bg-gray-100 p-5 rounded-xl flex flex-col gap-3">
                <p>
                  <span className="font-semibold">Total Orders:</span>{" "}
                  {totalOrders}
                </p>
                <p>
                  <span className="font-semibold">Delivered:</span>{" "}
                  {deliveredOrders}
                </p>
                <p>
                  <span className="font-semibold">Pending:</span>{" "}
                  {pendingOrders}
                </p>
                <p>
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {orders[0]?.paymentMethod || "—"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
