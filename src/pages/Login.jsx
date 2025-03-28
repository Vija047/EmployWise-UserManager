import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Corrected import
import { AuthContext } from "../context/authcontext"; // ✅ Import AuthContext

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ Correct way to use navigation

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

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token); // Save token in AuthContext and localStorage
        alert("Login successful!");
        navigate("/users"); // ✅ Redirect to dashboard after login
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 sm:p-8">
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
            Sign in to your account
          </h1>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input 
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
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
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 dark:bg-gray-700" />
                <label className="ml-2 text-sm text-gray-500 dark:text-gray-300">Remember me</label>
              </div>
              <a href="#" className="text-sm text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
            </div>

            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-5 py-2.5">
              Sign in
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Don’t have an account? <a href="#" className="text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
