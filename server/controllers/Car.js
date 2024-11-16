const Car = require("../models/Car");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.createProduct = async (req,res) =>{
    try {
        const userId = req.user.id;
        const { title, description, tags: _tags } = req.body;
    
        let tags;
        try {
          tags = typeof _tags === "string" ? JSON.parse(_tags) : _tags;
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: "Invalid tags format",
          });
        }
    
        // Validate required fields
        if (!title || !description || !req.files || !tags.car_type || !tags.company || !tags.dealer) {
          return res.status(400).json({
            success: false,
            message: "All fields are mandatory",
          });
        }
    

        const files = req.files && req.files.images
          ? Array.isArray(req.files.images) ? req.files.images : [req.files.images]
          : [];
        
        if (files.length === 0) {
          return res.status(400).json({
            success: false,
            message: "At least one image is required.",
          });
        }
    
        if (files.length > 10) {
          return res.status(400).json({
            success: false,
            message: "Cannot upload more than 10 images",
          });
        }
    
        // Upload images to Cloudinary
        const uploadedImages = [];
        for (const file of files) {
          const uploadedImage = await uploadImageToCloudinary(file, process.env.FOLDER_NAME);
          uploadedImages.push(uploadedImage.secure_url); // Save only the URL
        }
    
        // Create new car entry
        const newCar = await Car.create({
          user: userId,
          title,
          description,
          tags,
          images: uploadedImages, // Save Cloudinary URLs
        });
    
        return res.status(201).json({
          success: true,
          data: newCar,
          message: "Car created successfully",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Failed to create car",
          error: error.message,
        });
    }
}


exports.listProducts = async (req, res) => {
    try {
        const userId = req.user.id;
        const cars = await Car.find({ user: userId });

        return res.status(200).json({
            success: true,
            message: "Successfully retrieved all products",
            data: cars,
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
    }
};

exports.particularproduct = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { productId } = req.params; 

        const car = await Car.findById(productId);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully retrieved product",
            data: car,
        });
    } catch (error) {
        console.error("Error fetching product:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: error.message,
        });
    }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const car = await Car.findByIdAndDelete(productId);

    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Product successfully deleted.",
      data: car,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product.",
      error: error.message,
    });
  }
};

exports.updateProduct = async(req,res)=>{
  try {
    const { productId } = req.params;
    const { title, description, tags,existingImages } = req.body;

    const existingImagesArray = JSON.parse(existingImages || '[]');
    console.log("Existing Images: ", existingImagesArray);

    const files = req.files?.newImages ? (Array.isArray(req.files.newImages) ? req.files.newImages : [req.files.newImages]) : [];
    console.log("New Images: ",files);

    const updatedImages = [...existingImagesArray];

    // Upload new images to a storage service if applicable
    if(files.length > 0){
      for (const file of files) {
        const uploadedImage = await uploadImageToCloudinary(file, process.env.FOLDER_NAME);
        updatedImages.push(uploadedImage.secure_url); 
      }
    }
    

    const updatedProduct = await Car.findByIdAndUpdate(
      productId,
      { title, description, tags: JSON.parse(tags), images: updatedImages},
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Failed to update product." });
  }
}

exports.searchProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const {keyword} = req.body; 

    const cars = await Car.find({
      user: userId,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { 'tags.car_type': { $regex: keyword, $options: 'i' } },
        { 'tags.company': { $regex: keyword, $options: 'i' } },
        { 'tags.dealer': { $regex: keyword, $options: 'i' } },
      ],
    });

    return res.status(200).json({
      success: true,
      message: 'Search results fetched successfully',
      data: cars,
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch search results',
      error: error.message,
    });
  }
};