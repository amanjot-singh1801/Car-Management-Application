import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { setSignupData, setToken } from "../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, pwd);
      console.log("result ", result);
      dispatch(
        setToken(
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null
        )
      );
      dispatch(setSignupData(result.user));
      navigate("/products");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between h-screen bg-slate-800">
        <div className="w-full md:w-[38%] flex flex-col justify-center px-8 md:pl-20 ">
          <form onSubmit={submitForm} className="w-full mt-8">
            {/* Email Input */}
            <div className="mb-4">
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 font-bold borderborder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <input
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sign Up Link */}
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-5 py-2 mt-6 text-xl text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:flex md:w-1/2 lg:w-[55%] items-center justify-end">
          <img
            className="h-screen w-screen object-cover"
            src="sideImage.jpg"
            alt="Auth Background"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
