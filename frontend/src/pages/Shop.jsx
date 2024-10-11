import { useDispatch, useSelector } from "react-redux";
import { useGetCategoryListQuery } from "../redux/api/categorySlice";
import { useEffect, useState } from "react";
import { useGetFilteredProductsQuery } from "../redux/api/productSlice";
import {
  setCategories,
  setChecked,
  setProducts,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked } = useSelector((state) => state.shop);
  const categoriesQuery = useGetCategoryListQuery();
  const [priceFilter, setPriceFilter] = useState(["", ""]); // Min and Max price
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    priceFilter,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch, categoriesQuery.isLoading]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading) {
      const filteredProducts = filteredProductsQuery.data?.filter((product) => {
        const minPrice = priceFilter[0] ? parseInt(priceFilter[0], 10) : 0; // Parse min price
        const maxPrice = priceFilter[1]
          ? parseInt(priceFilter[1], 10)
          : Infinity; // Parse max price
        return product.price >= minPrice && product.price <= maxPrice;
      });
      dispatch(setProducts(filteredProducts)); // Set filtered products in the store
    }
  }, [
    filteredProductsQuery.data,
    priceFilter,
    dispatch,
    filteredProductsQuery.isLoading,
  ]);

  const handleBrandClick = (brand) => {
    const productsByBrand = products.filter(
      (product) => product.brand.toLowerCase() === brand // Normalize for comparison
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleChecked = (isChecked, id) => {
    const updatedChecked = isChecked
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Ensure unique brands are collected without duplicates
  const uniqueBrands = [
    ...new Set(
      products
        .map((product) => product.brand.toLowerCase())
        .filter((brand) => brand) // Filter out any falsy values
    ),
  ];

  const handlePriceChange = (e, index) => {
    const updatedPriceFilter = [...priceFilter];
    updatedPriceFilter[index] = e.target.value;
    setPriceFilter(updatedPriceFilter);
  };

  return (
    <div className="container mx-auto px-5 md:px-20 flex">
      {/* Sidebar */}
      <div className="bg-slate-100 p-3 mt-2 mb-2 h-max sticky top-0">
        <h2 className="text-center py-2 px-4 bg-slate-800 text-white rounded mb-2">
          Filter By Categories
        </h2>
        <div className="p-5 w-[15rem]">
          {categories?.map((c) => (
            <div key={c._id} className="mb-2">
              <div className="flex items-center mr-4">
                <input
                  type="checkbox"
                  id={`category-checkbox-${c._id}`}
                  onChange={(e) => handleChecked(e.target.checked, c._id)}
                  checked={checked.includes(c._id)}
                  className="cursor-pointer"
                />
                <label
                  htmlFor={`category-checkbox-${c._id}`}
                  className="ml-2 text-sm font-medium"
                >
                  {c.name.toUpperCase()}
                </label>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-center py-2 px-4 bg-slate-800 text-white rounded mb-2">
          Filter By Brands
        </h2>
        <div className="p-5 w-[15rem]">
          {uniqueBrands?.map((brand) => (
            <div key={brand} className="mb-2">
              <div className="flex items-center mr-4">
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="cursor-pointer"
                />
                <label htmlFor={brand} className="ml-2 text-sm font-medium">
                  {brand.toUpperCase()}
                </label>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-center py-2 px-4 bg-slate-800 text-white rounded mb-2">
          Filter By Price
        </h2>
        <div className="p-5 w-[15rem]">
          <input
            type="number"
            placeholder="Min Price"
            value={priceFilter[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent"
            min="0"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceFilter[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-transparent"
            min="0"
          />
        </div>

        <button
          onClick={() => window.location.reload()}
          className="text-center py-2 px-4 bg-slate-800 text-white rounded my-3"
        >
          RESET
        </button>
      </div>

      {/* Products section */}
      <div className="p-3 flex-grow">
        <h2 className="text-center font-semibold text-xl mb-2">
          Available Products: {products?.length}{" "}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Show loader while fetching products */}
          {filteredProductsQuery.isLoading ? (
            <Loader />
          ) : products?.length === 0 ? (
            <div className="text-center col-span-full">
              <p>No products found for the selected filters.</p>
            </div>
          ) : (
            products?.map((product) => (
              <div key={product._id} className="p-3">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
