import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authAPI';

const SignUp = () => {
  const [confirmPassword, setconfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    signUp(name,email,pwd,navigate);
  }

  return (
  
<div className="flex items-center justify-between h-screen bg-slate-800">
  <div className="w-full md:w-[38%] flex flex-col justify-center pl-8 md:pl-20">
    <form onSubmit={submitForm} className="w-full mt-8">
      
      {/* Email Input */}
      <div className="mb-4">
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sign Up Link */}
      <p className="text-gray-400">
        Don't have an account?{' '}
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

  )
}

export default SignUp