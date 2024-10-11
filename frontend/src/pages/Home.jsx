import { useParams } from "react-router";
import { useGetProductsQuery } from "../redux/api/productSlice";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header></Header> : null}
      {isLoading ? (
        <Loader></Loader>
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[10rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-slate-700 text-white font-bold rounded-full py-2 px-10 mr-[8rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          {/* Responsive flexbox layout for products */}
          <div className="flex justify-center flex-wrap mr-[3rem] mt-[1rem]">
            {data?.products.map((product) => (
              <div
                key={product._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 md:mx-10"
              >
                <Product product={product}></Product>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
