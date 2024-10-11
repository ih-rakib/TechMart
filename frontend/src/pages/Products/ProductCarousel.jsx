import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { useGetTopProductsQuery } from "../../redux/api/productSlice";
import Message from "../../components/Message";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[40rem] lg:w-[35rem] md:w-[30rem] sm:w-[25rem] w-[20rem]"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              rating,
              brand,
              quantity,
              countInStock,
              numReviews,
              createdAt,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[22rem]"
                />

                {/* Main Product Info */}
                <div className="flex justify-between space-x-3 mt-3">
                  {/* First Column */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="text-green-500 text-md font-bold">
                      $ {price}
                    </p>{" "}
                    <br />
                    <p className="w-[17rem]">
                      {description.substring(0, 170)}...
                    </p>
                  </div>

                  {/* Second Column */}
                  <div className="flex-1">
                    <div className="mb-6">
                      <h1 className="flex items-center">
                        <FaStore className="mr-2" /> Brand: {brand}
                      </h1>
                    </div>
                    <div className="mb-6">
                      <h1 className="flex items-center">
                        <FaClock className="mr-2" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                    </div>
                    <div className="mb-6">
                      <h1 className="flex items-center">
                        <FaStar className="mr-2" /> Reviews: {numReviews}
                      </h1>
                    </div>
                  </div>

                  {/* Third Column - Ratings */}
                  <div className="flex-1">
                    <div className="flex items-center mb-6">
                      <FaStar className="mr-2" /> Ratings: {Math.round(rating)}
                    </div>
                    <div className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2" /> Quantity: {quantity}
                    </div>
                    <div className="flex items-center mb-6">
                      <FaBox className="mr-2" /> In Stock: {countInStock}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
