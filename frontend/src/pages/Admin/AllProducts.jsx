import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader";
import { useFetchAllProductsQuery } from "../../redux/api/productSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useFetchAllProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <span>Error loading products</span>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-xl font-bold ml-[10rem] h-12 mb-3">
        All Products: ({products ? products.length : 0})
      </div>

      <div className="grid grid-cols-1 mx-[10rem] md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/admin/product/update/${product._id}`}
            className="block border rounded-md overflow-hidden shadow-md transition-transform transform mx-2"
          >
            <div className="flex h-[10rem]">
              {" "}
              {/* Image Section */}
              <img
                src={product?.image}
                alt={product?.name}
                className="w-[10rem] h-full object-cover"
              />
              {/* Content Section */}
              <div className="px-4 py-2 flex flex-col justify-between flex-grow">
                {/* First Row: Name and Date */}
                <div className="flex justify-between">
                  <h5 className="text-lg font-semibold truncate">
                    {product?.name}
                  </h5>
                  <p className="text-gray-400 text-xs">
                    {moment(product.createdAt).format("MMMM Do YYYY")}
                  </p>
                </div>
                {/* Second Row: Description */}
                <p className="text-gray-400 mb-4 text-sm overflow-hidden text-ellipsis">
                  {product?.description?.substring(0, 150)}...
                </p>

                <div className="flex justify-between items-center mt-auto">
                  {" "}
                  {/* Align items to the end */}
                  <Link
                    to={`/admin/product/update/${product._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-700 hover:bg-slate-800 rounded-lg focus:right-3 focus:outline-none focus:ring-slate-300 dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                  >
                    Update Product
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      ></path>
                    </svg>
                  </Link>
                  <p className="text-green-500">${product?.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <div className="md:w-1/4 p-3 mt-2"></div>
        <AdminMenu></AdminMenu>
      </div>
    </div>
  );
};

export default AllProducts;
