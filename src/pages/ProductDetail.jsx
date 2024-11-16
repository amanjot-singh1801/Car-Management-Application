import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/operations/carAPI';
import { useSelector } from 'react-redux';
import DeleteModal from '../components/Car/DeleteModal';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [sliderImage, setSliderImage] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProductDetails() {
      const response = await getProductById(token, productId);
      setProduct(response.data.data);
    }
    fetchProductDetails();
  }, [productId, token]);

  if (!product) return <p className="text-center text-lg text-gray-600 mt-20">Loading...</p>;

  function handleDelete() {
    setIsDeleteModelShow(true);
  }

  function handleEdit() {
    navigate(`/editproduct/${productId}`);
  }

  const tagString = product.tags
    ? Object.values(product.tags).join(', ')
    : 'No tags available';

  return (
    <div className="relative flex flex-col lg:flex-row items-start gap-10 p-8 mt-10 max-w-6xl mx-auto mb-10 shadow-lg rounded-lg bg-gray-200">
      {/* Product Images */}
      <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product Image ${index + 1}`}
            className="cursor-pointer object-cover rounded-lg w-full h-32 sm:h-40 lg:h-48 shadow hover:opacity-90 transition-all"
            onClick={() => setSliderImage(image)}
          />
        ))}
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-slate-700">{product.title}</h1>
        <p className="text-lg text-gray-600 leading-relaxed"><span className='text-slate-700 font-bold'>Description</span>: {product.description}</p>
        <div className="text-gray-600">
          <span className="font-bold text-slate-700">Tags:</span> {tagString}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 shadow-md transition-all"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 shadow-md transition-all"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModelShow && (
        <DeleteModal setIsDeleteModelShow={setIsDeleteModelShow} productId={productId} />
      )}


      {sliderImage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="relative max-w-4xl">
            <img
              src={sliderImage}
              alt="Slider"
              className="w-full h-[700px] rounded-lg shadow-lg"
            />
            <button
              onClick={() => setSliderImage(null)}
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
