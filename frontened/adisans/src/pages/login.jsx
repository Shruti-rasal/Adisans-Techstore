import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5001/api/v1/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);

      toast.success("Login Successful");
      

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      window.location.href = "/";

    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <form
          onSubmit={loginHandler}
          className="flex flex-col gap-5"
        >

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-cyan-500"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-cyan-500"
            required
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-500 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;