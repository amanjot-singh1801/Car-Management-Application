import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/operations/carAPI';
import { useSelector } from 'react-redux';
import DeleteModal from '../components/Car/DeleteModal';
import EditProduct from './EditProduct';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [sliderImage, setSliderImage] = useState(null); // To manage the selected image
  const { token } = useSelector((state) => state.auth);
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProductDetails() {
      const response = await getProductById(token, productId);
      console.log("Product Details:", response.data.data);
      setProduct(response.data.data);
    }

    fetchProductDetails();
  }, [productId, token]);

  if (!product) return <p>Loading...</p>;

  function handleDelete(){
    setIsDeleteModelShow(true);
  }

  function handleEdit(){
    navigate(`/editproduct/${productId}`)
  }

  const tagString = product.tags
    ? Object.values(product.tags).join(', ')
    : 'No tags available';

  return (
    <div className="relative flex p-5 mt-28">
      {/* Blur Effect When Slider Is Open */}
      <div className={`${sliderImage ? 'blur-sm' : ''} flex w-full`}>
        {/* Product Images */}
        <div className="grid grid-cols-3 gap-4 w-1/2">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              className="cursor-pointer object-cover rounded-lg"
              onClick={() => setSliderImage(image)} // Open the slider with the clicked image
            />
          ))}
        </div>

        {/* Product Details */}
        <div className="flex flex-col w-1/2 ml-5">
          <h2 className="text-4xl font-bold mb-6">{product.title}</h2>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-4">Tags: {tagString}</p>
          <div className='flex gap-x-20 justify-center'>
            <button className='bg-blue-500 px-10 py-2 rounded-md text-white font-bold hover:bg-blue-600 transition-all hover:shadow-md hover:shadow-slate-800 duration-300' onClick={() => handleEdit()}>Edit</button>
            <button  className='bg-blue-500 px-8 py-2 rounded-md text-white font-bold hover:bg-blue-600 transition-all hover:shadow-md hover:shadow-slate-800 duration-300' onClick={()=>handleDelete()}>Delete</button>
          </div>
        </div>
        </div>

        {isDeleteModelShow && (
        <DeleteModal setIsDeleteModelShow={setIsDeleteModelShow} productId={productId} />
      )}

      {/* Image Slider Modal */}
      {sliderImage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="relative w-3/4 max-w-4xl">
            <img
              src={sliderImage}
              alt="Slider"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setSliderImage(null)} // Close the slider
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
