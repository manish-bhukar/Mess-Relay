import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log the response
      console.log("response", response.data);
      
      // Set token in Authorization header
      console.log("token", response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      localStorage.setItem("token", response.data.token);
     
      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("emailId", response.data.email);

      // Confirm the token is set in local storage
      console.log("Token set in localStorage:", localStorage.getItem("token"));
      
      navigate("/home");
      window.location.reload();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("Invalid credentials. Please try again.");
        toast.error("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex h-screen bg-gradient-to-b from-indigo-800 to-indigo-600">
        <div className="m-auto w-full max-w-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Log in to your account
            </h2>
          </div>

          <div className="mt-8 bg-white shadow-md rounded-md p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 text-center">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Not a member?{" "}
                <Link
                  to="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
