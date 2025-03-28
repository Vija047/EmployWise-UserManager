import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    console.error("AuthContext is undefined. Make sure AuthProvider wraps your components.");
    return null;
  }

  const { login } = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    navigate("/users");

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        navigate("/users");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EmployWise</h1>
        <p className="text-gray-600 dark:text-gray-300">User Management System</p>
      </div>

      <section className="flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8">
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
            Sign in to your account
          </h1>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                <input type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 dark:bg-gray-700 mr-2" />
                Remember me
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">Forgot password?</a>
            </div>

            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-5 py-2.5 transition">
              Sign in
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Don’t have an account? <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Sign up</a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
