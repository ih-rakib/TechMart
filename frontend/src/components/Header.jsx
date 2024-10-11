import ProductCarousel from "../pages/Products/ProductCarousel";
import SmallProduct from "../pages/Products/SmallProduct";
import { useGetTopProductsQuery } from "../redux/api/productSlice";
import Loader from "./Loader";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  if (isLoading) {
    <Loader></Loader>;
  }

  if (error) {
    return <span>Something went wrong</span>;
  }

  if (!data || data.length === 0) {
    return <span>No products available</span>;
  }

  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product}></SmallProduct>
              </div>
            ))}
          </div>
        </div>

        <ProductCarousel></ProductCarousel>
      </div>
    </>
  );
};

export default Header;
