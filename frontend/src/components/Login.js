import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // default role
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);

    if (role === "admin") {
       navigate("/admin");
    } else if (role === "user") {
       navigate("/user-dash");
    } else if (role === "agent") {
      // navigate("/user-dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 overflow-hidden">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
          Dekago Ticketing System
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Log in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

                    <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Role
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="agent">Support Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-blue-500 hover:underline text-sm">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
