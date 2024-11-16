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
    <div>

        <div className='flex items-center justify-between h-screen bg-slate-900'>
            <div className='w-[38%] flex-col justify-center pl-20 rightForm '>
                {/* <div>
                    <img className='w-[300px] flex justify-center' src="/logo.png" alt="" />
                </div> */}
                <form onSubmit={submitForm} className='mt-[10px]' action="">
                    
                    <div className="inputBox">
                    <input required onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder='Name'/>
                    </div>

                    <div className="inputBox">
                    <input required onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder='Email'/>
                    </div>

                    <div className="inputBox">
                    <input required onChange={(e)=>{setPwd(e.target.value)}} value={pwd} type="password" placeholder='Password'/>
                    </div>

                    <div className="inputBox">
                    <input required onChange={(e)=>{setconfirmPassword(e.target.value)}} value={confirmPassword} type="password" placeholder='confirm Password'/>
                    </div>

                    <p className='text-[gray]'>Already have an account <Link to="/login" className='text-[#00AEEF]'>login</Link></p>


                    <button className="px-5 py-2 border-none bg-blue-500 rounded-md text-center text-xl w-full cursor-pointer mt-[20px]">Sign Up</button>
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
      
    </div>
  )
}

export default SignUp