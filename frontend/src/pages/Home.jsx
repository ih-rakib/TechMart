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
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-4 px-4 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:mt-20 lg:px-8">
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-700 px-8 py-3 font-bold text-white transition hover:bg-slate-800 sm:w-auto"
            >
              Shop
            </Link>
          </div>

          <div className="mx-auto mt-4 grid w-full max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-4 lg:px-8">
            {data?.products?.map((product) => (
              <div key={product._id} className="min-w-0">
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
