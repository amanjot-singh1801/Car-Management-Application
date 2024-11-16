import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export async function createCar(token,formData,navigate){
   const toastId = toast.loading("Loading...");
   try{
    console.log("Base_URL ",BASE_URL);
    const CREATECAR_API = BASE_URL + "/createproduct";
    console.log("CREATECAR_API",CREATECAR_API);

    const response = await apiConnector("POST", CREATECAR_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    console.log("CREATE API response ...... ",response);
    if(!response.data.success){
        toast.error(response.data.message);
        throw new Error(response.data.message);
    }
    
    toast.success("Create Product Successful");
    toast.dismiss(toastId);
    navigate('/products')
   }catch(error){
    console.log("Error occur during create car");
    toast.error(error.message);
    console.log(error);
   }
   toast.dismiss(toastId);
}


export async function getProducts(token){
  const toastId = toast.loading("Loading...");
  try{
    console.log("Base_URL ",BASE_URL);
    const FETCH_PRODUCT_API = BASE_URL + "/listproducts";
    console.log("FETCH_PRODUCT_API ",FETCH_PRODUCT_API);

    const response = await apiConnector("GET", FETCH_PRODUCT_API, {}, {
      Authorization: `Bearer ${token}`,
    })

    console.log("FETCH_PRODUCT_API response ...... ",response);
    if(!response.data.success){
        toast.error(response.data.message);
        throw new Error(response.data.message);
    }
    toast.dismiss(toastId);
    return response;
  }catch(error){
    console.log("Error occur during Fetching Product");
    toast.error(error.message);
    console.log(error);
  }
  toast.dismiss(toastId);
}

export async function getProductById(token,productId){
  const toastId = toast.loading("Loading...");
  try{
    console.log("Base_URL ",BASE_URL);
    const FETCH_SINGLE_PRODUCT_API = BASE_URL + `/particularproduct/${productId}`;
    console.log("FETCH_SINGLE_PRODUCT_API ",FETCH_SINGLE_PRODUCT_API);

    const response = await apiConnector("GET", FETCH_SINGLE_PRODUCT_API, {}, {
      Authorization: `Bearer ${token}`,
    })

    console.log("FETCH_SINGLE_PRODUCT_API response ...... ",response);
    if(!response.data.success){
        toast.error(response.data.message);
        throw new Error(response.data.message);
    }
    toast.dismiss(toastId);
    return response;
  }catch(error){
    console.log("Error occur during Fetching Particular Product");
    toast.error(error.message);
    console.log(error);
  }
  toast.dismiss(toastId);
}

export async function deleteProduct(token,productId,navigate){
  try{
      const toastId = toast.loading("Deleting Product....");
      const DELETEProduct_API = BASE_URL + '/deleteproduct';
      console.log("DELETEProduct_API",DELETEProduct_API);

      const response = await apiConnector("DELETE",DELETEProduct_API,{productId}, {
          Authorization: `Bearer ${token}`,
      }); 

      if(!response.data.success){
          throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      navigate('/products');
  }catch(error){
      console.log("Error occur during Delete Product");
      console.log(error);
  }
}

export async function updateProduct (token,productId,formData){
  const toastId = toast.loading("Loading...");
  try{
    console.log("Base_URL ",BASE_URL);
    const UPDATE_PRODUCT_API = BASE_URL + `/updateproduct/${productId}`;
    console.log("UPDATE_PRODUCT_API ",UPDATE_PRODUCT_API);

    const response = await apiConnector("PUT", UPDATE_PRODUCT_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    console.log("UPDATE_PRODUCT_API response ...... ",response);
    if(!response.data.success){
        toast.error(response.data.message);
        throw new Error(response.data.message);
    }
    toast.dismiss(toastId);
    return response;
  }catch(error){
    console.log("Error occur during Updating Product");
    toast.error(error.message);
    console.log(error);
  }
  toast.dismiss(toastId);
}

export async function searchProducts(token,keyword){
  const toastId = toast.loading("Loading...");
  try{
    console.log("Base_URL ",BASE_URL);
    const SEARCH_PRODUCT_API = BASE_URL + "/searchproduct";
    console.log("SEARCH_PRODUCT_API ",SEARCH_PRODUCT_API);

    const response = await apiConnector("POST", SEARCH_PRODUCT_API, {keyword}, {
      Authorization: `Bearer ${token}`,
    })

    console.log("SEARCH_PRODUCT_API response ...... ",response);
    if(!response.data.success){
        toast.error(response.data.message);
        throw new Error(response.data.message);
    }
    toast.dismiss(toastId);
    return response;
  }catch(error){
    console.log("Error occur during Searching Product");
    toast.error(error.message);
    console.log(error);
  }
  toast.dismiss(toastId);
}