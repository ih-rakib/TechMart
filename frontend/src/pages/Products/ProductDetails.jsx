import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import HeartIcon from "./HeartIcon";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review added successfully");
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <div>
        <Link
          to="/"
          className="mx-auto flex w-full max-w-7xl items-center px-4 font-semibold text-gray-800 hover:underline sm:px-6 lg:px-8"
        >
          <AiOutlineArrowLeft className="mr-2 text-gray-800" /> Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="mx-auto mt-6 w-full max-w-7xl min-w-0 px-4 sm:mt-8 sm:px-6 lg:px-8">
            {/* Wrap Image and Details in a container */}
            <div className="flex min-w-0 flex-col gap-6 md:flex-row md:gap-8">
              {/* Image Section */}
              <div className="w-full min-w-0 md:w-1/2">
                <div className="relative pb-[100%]">
                  {" "}
                  {/* 1:1 Aspect Ratio */}
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = /headphone|headset|earbud/i.test(product.name)
                        ? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
                        : "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80";
                    }}
                    className="absolute left-0 top-0 h-full w-full rounded-lg bg-white object-contain"
                  />
                  <HeartIcon product={product} />
                </div>
              </div>

              {/* Details Section */}
              <div className="w-full min-w-0 md:w-1/2">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="my-4 text-[#B0B0B0]">{product.description}</p>
                <p className="my-4 text-3xl font-extrabold sm:text-4xl">
                  $ {product.price}
                </p>
                <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="one">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="mr-2"></FaStore> Brand:{" "}
                      {product.brand}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaClock className="mr-2"></FaClock> Added:{" "}
                      {moment(product.createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2"></FaStar> Reviews:{" "}
                      {product.numReviews}
                    </h1>
                  </div>

                  <div className="two">
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2"></FaStar> Ratings:{" "}
                      {product.rating}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2"></FaShoppingCart>{" "}
                      Quantity: {product.quantity}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaBox className="mr-2"></FaBox> In Stock:{" "}
                      {product.countInStock}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-10 flex-wrap">
                  {/* Ratings */}
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  ></Ratings>

                  {product.countInStock > 0 && (
                    <div>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="p-2 bg-slate-100 w-[6rem] rounded-lg"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="btn-container">
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="bg-slate-700 text-white hover:bg-slate-800 py-2 px-4 rounded-lg mt-4 md:mt-1"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>

            {/* ProductTabs - Full Width Below Image and Details */}
            <div className="mt-10 w-full min-w-0">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                handleSubmit={handleSubmit}
                userInfo={userInfo}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
