import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
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
} from "../controllers/productController.js";
import checkId from "../middlewares/checkId.js";
const router = express.Router();

router.route("/allProducts").get(fetchAllProducts); // necessary to keep it above getProducts route

router.route("/").get(getProducts);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router
  .route("/:id")
  .get(getProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, deleteProduct);

router.route("/filtered-products").post(filteredProducts);

export default router;
