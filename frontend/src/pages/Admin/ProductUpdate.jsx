import { useNavigate, useParams } from "react-router";
import { useGetCategoryListQuery } from "../../redux/api/categorySlice";
import { useEffect, useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productSlice";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData, refetch } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [category, setCategory] = useState(productData?.category || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  const navigate = useNavigate();

  const { data: categories = [] } = useGetCategoryListQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setCategory(productData.category);
      setPrice(productData.price);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setStock(productData.countInStock);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const { data } = await updateProduct({ productId: params._id, formData });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product updated successfully`);
        refetch();
        navigate("/admin/allProducts");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed, try again");
    }
  };

  const handleDelete = async () => {
    try {
      let ans = window.confirm("Are you sure you want to delete this product?");
      if (!ans) return;
      const { data } = await deleteProduct(params._id);
      toast.success(`${data.name} is deleted!`);
      refetch();
      navigate("/admin/allProducts");
    } catch (error) {
      console.error(error);
      toast.error("Product deletion failed, try again");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        {/* Admin menu */}
        <AdminMenu></AdminMenu>
        <div className="md:w-3/4 p-3">
          <div className="h-12 font-semibold text-2xl">Update Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
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
                // onChange={uploadFileHandler}
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
                <label htmlFor="stock">Count In Stock</label>
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
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={handleUpdate}
                className="mr-[1rem] py-3 px-7 mt-5 rounded-lg text-lg text-white bg-slate-700 hover:bg-slate-800"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-3 px-7 mt-5 rounded-lg text-lg text-white bg-red-500 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
