import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export async function signUp(name,email,password,navigate){
   const toastId = toast.loading("Loading...");
   console.log('Environment Variables:', process.env);
   try{
    console.log("Base_URL ",BASE_URL);
    const SIGNUP_API = BASE_URL + "/signup";
    console.log("Signup_api",SIGNUP_API);
    
    const response = await apiConnector("POST",SIGNUP_API,{name,email,password});

    console.log("SIGNUP_ API response ...... ",response);
    if(!response.data.success){
        toast.error(response.data.message);
        throw new Error(response.data.message);
    }
    
    toast.success("Signup Successful");
    toast.dismiss(toastId);
    navigate("/login");
   }catch(error){
    console.log("Error occur during Signup");
    toast.error(error.message);
    console.log(error);
   }
   toast.dismiss(toastId);
}

export async function login(email, password) {
    const toastId = toast.loading("Loading...");
    try {
      const LOGIN_API = BASE_URL + "/login";
      const response = await apiConnector("POST", LOGIN_API, { email, password });
  
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
  
      toast.success("Login Successful");
      localStorage.setItem("token", JSON.stringify(response.data.token));
      toast.dismiss(toastId);
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error during login:", error);
      toast.dismiss(toastId);
      throw error;
    }
  }
  