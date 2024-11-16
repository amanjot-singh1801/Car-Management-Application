import React, { useState } from "react";
import { createCar } from "../../services/operations/carAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CarForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState({ car_type: "", company: "", dealer: "" });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const {token} = useSelector((state) => state.auth);
  console.log("Token value in frontend ",token);
  const navigate = useNavigate();
  const MAX_IMAGES = 10;

  // Handle image selection
  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);

    if (selectedImages.length + images.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    setImages([...images, ...selectedImages]);

    // Create preview URLs for selected images
    const previews = selectedImages.map((image) => URL.createObjectURL(image));
    setPreviewImages([...previewImages, ...previews]);
  };

  // Remove image from preview and state
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate fields
    if (!title || !description || images.length === 0) {
      alert("Please fill out all fields and upload at least one image.");
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags));
    images.forEach((image) => formData.append("images", image));

    await createCar(token,formData,navigate);
  };

  return (
    <div className="max-w-2xl mx-auto mt-5 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Car</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter car title"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter car description"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tags</label>
          <input
            type="text"
            value={tags.car_type}
            onChange={(e) =>
              setTags({ ...tags, car_type: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Car Type"
          />
          <input
            type="text"
            value={tags.company}
            onChange={(e) => setTags({ ...tags, company: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Company"
          />
          <input
            type="text"
            value={tags.dealer}
            onChange={(e) => setTags({ ...tags, dealer: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Dealer"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Images (Max: {MAX_IMAGES})
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Image Previews */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {previewImages.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Preview ${index + 1}`}
                className="w-full h-28 object-cover rounded-md border border-gray-200"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 mt-6 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CarForm;
