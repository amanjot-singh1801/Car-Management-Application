import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts, searchProducts } from '../services/operations/carAPI';
import { FaSearch } from "react-icons/fa";
import ProductCard from '../components/Car/ProductCard ';
import { setToken } from '../slices/authSlice';

const Products = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function fetchProducts() {
        await getProducts(token).then((response)=>{
          console.log("response",response.data.data);
          setProducts(response.data.data);
        });
    }

    fetchProducts();
  },[]);

  const handleSearch = async () => {

    if(searchKeyword == ""){
      return;
    }
    try {
      const response = await searchProducts(token, searchKeyword); // Call searchProducts API
      setProducts(response.data.data); // Update products state with filtered results
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };
  const handleLogout= (event)=>{
    event.preventDefault();
    localStorage.removeItem("token");
    dispatch(setToken(null));
    navigate('/login');
  }

  return (
    <div >
      <div className='flex justify-around border-b-2 h-full shadow-sm py-3 shadow-slate-500 w-full items-center bg-gray-200'>
        <button
        className='bg-blue-500 px-7 py-2 rounded-md text-white font-bold hover:bg-blue-600 transition-all hover:shadow-md hover:shadow-slate-800 duration-300' 
        onClick={() => navigate('/createProduct')}
        >
          Add products
        </button>
        <div className="flex items-center">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search Here "
            className="flex px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 shadow-md shadow-slate-700"
          />
          <FaSearch  onClick={handleSearch} className='ml-4'/>
        </div>
        <div>
            <button className='bg-blue-500 px-8 py-2 rounded-md text-white font-bold hover:bg-blue-600 transition-all hover:shadow-md hover:shadow-slate-800 duration-300' onClick={(e)=>handleLogout(e)}>Logout</button>
        </div>
      </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
