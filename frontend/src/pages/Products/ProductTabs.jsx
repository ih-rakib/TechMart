import { useState } from "react";
import { useGetTopProductsQuery } from "../../redux/api/productSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import SmallProduct from "./SmallProduct";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  handleSubmit,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-6 md:flex-row">
      <section className="w-full shrink-0 md:w-56">
        <div
          onClick={() => handleTabClick(1)}
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 1 ? "font-bold" : ""
          }`}
        >
          Write Your Review
        </div>

        <div
          onClick={() => handleTabClick(2)}
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 2 ? "font-bold" : ""
          }`}
        >
          All Reviews
        </div>

        <div
          onClick={() => handleTabClick(3)}
          className={`flex-1 p-4 cursor-pointer text-lg whitespace-nowrap ${
            activeTab === 3 ? "font-bold" : ""
          }`}
        >
          Related Products
        </div>
      </section>

      {/* second part of section */}
      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={handleSubmit}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full max-w-2xl rounded-lg border p-2"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Excellent</option>
                    <option value="4">Wholesome</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>

                  <textarea
                    id="comment"
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full max-w-2xl rounded-lg border p-2"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-slate-700 hover:bg-slate-800 px-4 py-2 text-white rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/login">Sign in</Link> to write a review
              </p>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTab === 2 && (
          <>
            <div>
              {product.reviews.length === 0 && <span>No Reviews yet</span>}
            </div>
            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="mb-5 w-full max-w-3xl rounded-lg bg-slate-100 p-4"
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <strong className="text-slate-800">{review.name}</strong>
                    <p className="text-slate-800">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>

                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating}></Ratings>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section>
        {activeTab === 3 && (
          <section className="flex min-w-0 flex-wrap gap-4">
            {!data ? (
              <Loader></Loader>
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product}></SmallProduct>
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
