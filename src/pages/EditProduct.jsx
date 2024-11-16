import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { getProductById, updateProduct } from '../services/operations/carAPI';
import { useSelector } from 'react-redux';
import { getProductById, updateProduct } from '../services/operations/carAPI';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState({});
  const [images, setImages] = useState([]); 
  const [newImages, setNewImages] = useState([]); 

  useEffect(() => {
    async function fetchProduct() {
      console.log("hello");
      const response = await getProductById(token, productId);
      const data = response.data.data;
      setProduct(data);
      setTitle(data.title);
      setDescription(data.description);
      setTags(data.tags);
      setImages(data.images);
    }

    fetchProduct();
  }, [productId, token]);

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  

  const handleNewImageAdd = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isChanged = title !== product.title || description !== product.description ||
                      JSON.stringify(tags) !== JSON.stringify(product.tags) ||
                      newImages.length > 0 || images.length !== product.images.length;

  if (!isChanged) {
    alert("No changes Done.");
    return;
  }
    if (images.length === 0 && newImages.length === 0) {
      alert("Please upload at least one picture.");
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags));

    // Append remaining images
    images.forEach((image) => formData.append('existingImages', image));
    newImages.forEach((image) => formData.append('newImages', image));


    const response = await updateProduct(token, productId, formData);
    if (response.data.success) {
      navigate('/products');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          {Object.keys(tags).map((key) => (
            <div key={key} className="flex items-center gap-4 mb-2">
              <span className="w-32 capitalize">{key}:</span>
              <input
                type="text"
                value={tags[key]}
                onChange={(e) => setTags({ ...tags, [key]: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          ))}
        </div>

        {/* Existing Images */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Existing Images</label>
          <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt="Product" className="w-32 h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Images */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Add New Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleNewImageAdd}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
