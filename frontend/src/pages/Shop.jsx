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
  const [priceFilter, setPriceFilter] = useState(["", ""]);
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
        const minPrice = priceFilter[0] ? parseInt(priceFilter[0], 10) : 0;
        const maxPrice = priceFilter[1]
          ? parseInt(priceFilter[1], 10)
          : Infinity;
        return product.price >= minPrice && product.price <= maxPrice;
      });
      dispatch(setProducts(filteredProducts));
    }
  }, [
    filteredProductsQuery.data,
    priceFilter,
    dispatch,
    filteredProductsQuery.isLoading,
  ]);

  const handleBrandClick = (brand) => {
    const productsByBrand = products.filter(
      (product) => product.brand.toLowerCase() === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleChecked = (isChecked, id) => {
    const updatedChecked = isChecked
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...new Set(
      products
        .map((product) => product.brand.toLowerCase())
        .filter((brand) => brand)
    ),
  ];

  const handlePriceChange = (e, index) => {
    const updatedPriceFilter = [...priceFilter];
    updatedPriceFilter[index] = e.target.value;
    setPriceFilter(updatedPriceFilter);
  };

  return (
    <div className="container mx-auto flex w-full min-w-0 flex-col gap-4 px-3 py-3 sm:px-5 md:flex-row md:items-start md:gap-5 md:px-6 lg:px-8">
      {/* Filters sit above the products on phones and beside them on larger screens. */}
      <aside className="mt-1 h-max w-full min-w-0 rounded-lg bg-slate-100 p-3 md:sticky md:top-4 md:w-64 md:shrink-0">
        <h2 className="mb-2 rounded bg-slate-800 px-3 py-2 text-center text-base font-semibold text-white sm:text-lg">
          Filter By Categories
        </h2>
        <div className="w-full p-3 sm:p-4 md:p-3">
          {categories?.map((c) => (
            <div key={c._id} className="mb-2">
              <div className="mr-2 flex items-center">
                <input
                  type="checkbox"
                  id={`category-checkbox-${c._id}`}
                  onChange={(e) => handleChecked(e.target.checked, c._id)}
                  checked={checked.includes(c._id)}
                  className="cursor-pointer"
                />
                <label
                  htmlFor={`category-checkbox-${c._id}`}
                  className="ml-2 break-words text-sm font-medium"
                >
                  {c.name.toUpperCase()}
                </label>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-2 rounded bg-slate-800 px-3 py-2 text-center text-base font-semibold text-white sm:text-lg">
          Filter By Brands
        </h2>
        <div className="w-full p-3 sm:p-4 md:p-3">
          {uniqueBrands?.map((brand) => (
            <div key={brand} className="mb-2">
              <div className="mr-2 flex items-center">
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="cursor-pointer"
                />
                <label htmlFor={brand} className="ml-2 break-words text-sm font-medium">
                  {brand.toUpperCase()}
                </label>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-2 rounded bg-slate-800 px-3 py-2 text-center text-base font-semibold text-white sm:text-lg">
          Filter By Price
        </h2>
        <div className="flex w-full flex-col gap-2 p-3 sm:p-4 md:p-3">
          <input
            type="number"
            placeholder="Min Price"
            value={priceFilter[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="w-full min-w-0 rounded-md border border-gray-300 bg-white p-3 text-base focus:border-transparent focus:outline-none focus:ring-1 focus:ring-slate-800"
            min="0"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceFilter[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full min-w-0 rounded-md border border-gray-300 bg-white p-3 text-base focus:border-transparent focus:outline-none focus:ring-1 focus:ring-slate-800"
            min="0"
          />
        </div>

        <button
          onClick={() => window.location.reload()}
          className="my-2 w-full rounded bg-slate-800 px-4 py-3 text-center font-semibold text-white transition hover:bg-slate-700 md:w-auto"
        >
          RESET
        </button>
      </aside>

      {/* min-w-0 prevents the results column from being squeezed or overflowing. */}
      <section className="min-w-0 flex-1 p-1 sm:p-2">
        <h2 className="mb-4 text-center text-lg font-semibold sm:text-xl">
          Available Products: {products?.length ?? 0}
        </h2>
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProductsQuery.isLoading ? (
            <div className="col-span-full flex justify-center py-8">
              <Loader />
            </div>
          ) : products?.length === 0 ? (
            <div className="col-span-full rounded-lg bg-slate-50 px-4 py-8 text-center text-base text-slate-600">
              No products found for the selected filters.
            </div>
          ) : (
            products?.map((product) => (
              <div key={product._id} className="min-w-0 p-1">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
