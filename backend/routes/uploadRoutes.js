import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// image upload using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname); // Get the file extension
    const basename = path.basename(file.originalname, extname); // Get the base name without extension

    // Custom name logic: Use original name and current timestamp
    cb(null, `${basename}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/; // Allow these extensions
  const mimetype = file.mimetype;

  if (
    filetypes.test(path.extname(file.originalname).toLowerCase()) && // Check extension
    /image\/(jpeg|png|webp)/.test(mimetype) // Check mimetype
  ) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Images only!"), false); // Reject file
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      const imagePath = req.file.path.replace(/\\/g, "/"); // Replace backslashes
      res.status(200).send({
        message: "Image Uploaded Successfully!",
        image: `/${imagePath}`, // Prepend a forward slash for the URL
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
