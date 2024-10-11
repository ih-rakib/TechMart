import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Validation function
const validateProductFields = (fields) => {
  const { name, description, price, category, quantity, brand } = fields;

  if (!name) return "Name is required";
  if (!description) return "Description is required";
  if (!price) return "Price is required";
  if (!brand) return "Brand is required";
  if (!quantity) return "Quantity is required";
  if (!category) return "Category is required";

  return null; // No validation errors
};

const getProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword }).limit(pageSize);

    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

const addProduct = asyncHandler(async (req, res) => {
  try {
    const validationError = validateProductFields(req.fields);
    if (validationError) return res.json({ message: validationError });

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const validationError = validateProductFields(req.fields);
    if (validationError) return res.json({ message: validationError });

    const product = await Product.findByIdAndUpdate(req.params.id, req.fields, {
      new: true, // Return the updated document
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: "Product already reviewd" });
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

const filteredProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};

    if (checked && checked.length > 0) {
      args.category = { $in: checked };
    }

    if (radio && radio.length > 0) {
      args.price = {};
      if (radio.length === 1) {
        args.price.$gte = radio[0];
      } else if (radio.length === 2) {
        args.price.$gte = radio[0];
        args.price.$lte = radio[1];
      }
    }

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export {
  getProducts,
  getProductById,
  addProduct,
  updateProductDetails,
  deleteProduct,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filteredProducts,
};
