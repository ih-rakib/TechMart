import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

// Add a starter catalog only when the database has no products.
// Existing store data is never overwritten or deleted.
const starterCatalog = [
  {
    name: "Wireless Noise-Cancelling Headphones",
    brand: "SoundCore",
    price: 79.99,
    quantity: 25,
    countInStock: 25,
    description: "Comfortable over-ear wireless headphones with rich sound, active noise cancellation, and long battery life for work and travel.",
    image: "https://images.unsplash.com/photo-1502951682449-e5b93545d646?auto=format&fit=crop&w=900&q=80",
    categoryName: "Audio",
  },
  {
    name: "Smart Watch Series",
    brand: "TechFit",
    price: 119.99,
    quantity: 18,
    countInStock: 18,
    description: "A versatile smart watch for everyday activity tracking, notifications, and a clean modern look.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    categoryName: "Wearables",
  },
  {
    name: "Compact Wireless Mouse",
    brand: "LogiPro",
    price: 24.99,
    quantity: 40,
    countInStock: 40,
    description: "A compact, reliable wireless mouse with a comfortable shape for home, office, and study setups.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
    categoryName: "Accessories",
  },
  {
    name: "Mechanical Gaming Keyboard",
    brand: "KeyForge",
    price: 64.99,
    quantity: 20,
    countInStock: 20,
    description: "A responsive mechanical keyboard designed for gaming, coding, and comfortable everyday typing.",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=900&q=80",
    categoryName: "Accessories",
  },
  {
    name: "Portable Bluetooth Speaker",
    brand: "SoundCore",
    price: 39.99,
    quantity: 32,
    countInStock: 32,
    description: "A portable Bluetooth speaker delivering clear sound for desks, small gatherings, and outdoor listening.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
    categoryName: "Audio",
  },
  {
    name: "Mirrorless Digital Camera",
    brand: "CaptureOne",
    price: 549.99,
    quantity: 7,
    countInStock: 7,
    description: "A versatile digital camera for creators who want detailed photos, travel memories, and everyday content.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    categoryName: "Cameras",
  },
  {
    name: "Slim Laptop Backpack",
    brand: "UrbanCarry",
    price: 44.99,
    quantity: 22,
    countInStock: 22,
    description: "A clean, practical backpack with room for a laptop and daily essentials for commuting and travel.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    categoryName: "Accessories",
  },
  {
    name: "USB-C Charging Hub",
    brand: "ConnectX",
    price: 29.99,
    quantity: 35,
    countInStock: 35,
    description: "A compact USB-C hub to keep everyday devices connected with a tidy desk setup.",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
    categoryName: "Accessories",
  },
];

export async function seedStarterCatalog() {
  const existingProducts = await Product.countDocuments();
  if (existingProducts > 0) {
    console.log(`Starter catalog skipped: ${existingProducts} products already exist.`);
    return;
  }

  const categoryNames = [...new Set(starterCatalog.map((item) => item.categoryName))];
  const categories = {};

  for (const name of categoryNames) {
    categories[name] = await Category.findOneAndUpdate(
      { name },
      { $setOnInsert: { name } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }

  const products = starterCatalog.map(({ categoryName, ...product }) => ({
    ...product,
    category: categories[categoryName]._id,
    rating: 0,
    numReviews: 0,
    reviews: [],
  }));

  await Product.insertMany(products);
  console.log(`Starter catalog added: ${products.length} demo products across ${categoryNames.length} categories.`);
}
