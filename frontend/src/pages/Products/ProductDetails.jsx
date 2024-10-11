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
          className="flex items-center font-semibold hover:underline ml-[10rem] text-gray-800"
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
          <div className="mt-[2rem] ml-[10rem] mr-[7rem]">
            {/* Wrap Image and Details in a container */}
            <div className="flex justify-between">
              {/* Image Section */}
              <div className="w-full md:w-1/2 mr-[2rem]">
                <div className="relative pb-[100%]">
                  {" "}
                  {/* 1:1 Aspect Ratio */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                  <HeartIcon product={product} />
                </div>
              </div>

              {/* Details Section */}
              <div className="w-1/2">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="my-4 text-[#B0B0B0]">{product.description}</p>
                <p className="text-5xl my-4 font-extrabold">
                  $ {product.price}
                </p>
                <div className="flex items-center justify-between w-[20rem]">
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
            <div className="ml-[10rem] mt-[5rem] container flex flex-wrap items-start justify-between">
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
