import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Handle card click
  const handleCardClick = () => {
    navigate(`/product/${product._id}`); // Navigate to product detail page
  };

  return (
    <div
      className="border m-4 rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer"
      onClick={handleCardClick} // Adding onClick here for navigation
    >
      <img
        src={product.images[0]} // Display the first image
        alt={product.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
      <p className="text-gray-600"> {product.description.split(" ").length > 8
      ? `${product.description.split(" ").slice(0, 8).join(" ")}...`
      : product.description}</p>
    </div>
  );
};

export default ProductCard;