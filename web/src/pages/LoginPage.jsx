import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:7000/api/auth/login",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        // Set the user and token in the store
        setUser(response.data.user, response.data.token);

        // Check the role of the user and navigate accordingly
        if (response.data.user.role === "admin") {
          navigate("/admin"); // Navigate to the admin page if admin
        } else {
          navigate("/home"); // Navigate to home page for regular users
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <img src={logo} alt="Logo" className="w-72 h-36 object-contain" />

      <div className="w-4/5 md:w-1/3 mt-8 space-y-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-4 text-gray-600 hover:text-blue-500"
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && <p className="text-center text-red-600">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full p-3 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
