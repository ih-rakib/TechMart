import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { FaArrowRight } from "react-icons/fa";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Item added successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-sm relative bg-slate-100 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100">
      <section className="relative">
        <Link to={`/product/${product._id}`}>
          <span className="absolute bottom-3 right-3 bg-slate-100 text-slate-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-slate-900 dark:text-slate-300">
            {product?.brand}
          </span>

          <img
            src={product?.image}
            alt={product?.name}
            style={{ height: "170px", objectFit: "cover" }}
            className="cursor-pointer w-full"
          />
        </Link>
        <HeartIcon product={product}></HeartIcon>
      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-md font-bold text-slate-800 dark:text-slate-100">
            {product?.name}
          </h5>

          <p className="text-block font-semibold text-slate-700">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-sm text-gray-500">
          {product?.description?.substring(0, 60)}...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${product._id}`}
            className="text-white inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-2 focus:outline-none"
          >
            Read More <FaArrowRight className="ml-2" />
          </Link>

          <button
            onClick={() => addToCartHandler(product, 1)}
            className="p-2 rounded-full"
          >
            <AiOutlineShoppingCart size={25}></AiOutlineShoppingCart>
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
