import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
  "http://localhost:5001/api/v1/user/register",
  {
    fullname,
    email,
    phoneNumber,
    password,
  }
);

toast.success("User Registered Successfully");

navigate("/login");

    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Register
        </h1>

        <form
          onSubmit={registerHandler}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-cyan-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-cyan-500"
            required
          />

         <input
  type="tel"
  placeholder="Enter Phone Number"
  value={phoneNumber}
  onChange={(e) => {
    const value = e.target.value;

    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  }}
  className="border p-3 rounded-lg outline-none focus:border-cyan-500"
  required
/>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-cyan-500"
            required
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-500 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;