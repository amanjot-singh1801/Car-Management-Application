import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { setSignupData, setToken } from '../slices/authSlice';


const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try{
      const result = await login(email,pwd);
      console.log("result ",result);
      dispatch(setToken(localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null));
      dispatch(setSignupData(result.user));
      navigate("/products");
    }catch(error){
      console.error("Login failed:", error);
    }
  }

  return (
    <>
      <div className='flex items-center justify-between h-screen bg-slate-800'>
            <div className='w-[38%] flex-col justify-center pl-20 rightForm '>
                <form onSubmit={submitForm} className='w-full mt-[30px]' action="">

                <div className="inputBox">
                  <input required onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder='Email'/>
                </div>

                <div className="inputBox">
                  <input required onChange={(e)=>{setPwd(e.target.value)}} value={pwd} type="password" placeholder='Password'/>
                </div>

                <p className='text-[gray]'>Don't have an account <Link to="/" className='text-[#00AEEF]'>Sign Up</Link></p>


                <button className="px-5 py-2 border-none bg-blue-500 rounded-md text-center text-xl w-full cursor-pointer mt-[20px]">Login</button>
              </form>
            </div>
            
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

export default Login