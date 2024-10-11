import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productSlice";
import { useGetCategoryListQuery } from "../../redux/api/categorySlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { apiSlice } from "../../redux/api/apiSlice";
import { useDispatch } from "react-redux";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetCategoryListQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !image ||
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !brand ||
      stock <= 0
    ) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed, try again");
      } else {
        toast.success(`${data.name} is created successfully`);
        dispatch(apiSlice.util.invalidateTags(["Category"]));
        navigate("/admin/allProducts");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed, try again");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        {/* Admin menu */}
        <AdminMenu></AdminMenu>
        <div className="md:w-3/4 p-3">
          <div className="h-12 font-semibold text-2xl">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product image"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label
              htmlFor="image-upload"
              className="border px-4 py-11 text-center w-full rounded-lg font-bold block cursor-pointer"
            >
              {image ? image.name : "Upload image"}

              <input
                type="file"
                id="image-upload"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap gap-10">
              <div className="one">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  className="p-3 mb-3 w-[30rem] border rounded-lg bg-gray-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="two">
                <label htmlFor="price">Price</label>
                <br />
                <input
                  type="number"
                  className="p-3 mb-3 w-[30rem] border rounded-lg bg-gray-100"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-10">
              <div className="one">
                <label htmlFor="quantity">Quantity</label>
                <br />
                <input
                  type="number"
                  className="p-3 mb-3 w-[30rem] border rounded-lg bg-gray-100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="two">
                <label htmlFor="brand">Brand</label>
                <br />
                <input
                  type="text"
                  className="p-3 mb-3 w-[30rem] border rounded-lg bg-gray-100"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="">
                Description
              </label>
              <textarea
                type="text"
                className="p-2 mb-3 bg-gray-100 border rounded-lg w-[62.5rem]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="flex flex-wrap gap-10">
              <div>
                <label htmlFor="name block">Count In Stock</label>
                <br />
                <input
                  type="text"
                  className="p-3 mb-1 w-[30rem] border rounded-lg bg-gray-100"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Category</label>
                <br />
                <select
                  placeholder="Choose Category"
                  className="p-3 mb-3 w-[30rem] border rounded-lg bg-gray-100"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-3 px-7 mt-5 rounded-lg text-lg text-white bg-slate-700 hover:bg-slate-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
