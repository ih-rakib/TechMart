import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../../redux/api/productSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ProductCarousel = () => {
  const { data: products = [], isLoading, error } = useGetTopProductsQuery();
  const settings = {
    dots: true,
    infinite: products.length > 1,
    speed: 450,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: products.length > 1,
    autoplaySpeed: 4000,
    arrows: false,
    adaptiveHeight: true,
  };

  if (isLoading) {
    return (
      <div className="mx-auto my-6 h-72 w-full max-w-6xl animate-pulse rounded-2xl bg-slate-100 sm:h-96" />
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-6 w-full max-w-6xl px-4">
        <Message variant="danger">
          {error?.data?.message || error.message || "Unable to load featured products."}
        </Message>
      </div>
    );
  }

  if (!products.length) {
    return (
      <section className="mx-auto my-6 w-full max-w-6xl px-4">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 px-6 py-10 text-white sm:px-10 sm:py-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">TechMart</p>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">Technology for your everyday life.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">Explore useful tech, accessories, and gear for work, study, and play.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-sky-100">Explore the shop</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto my-4 w-full max-w-6xl px-3 sm:my-8 sm:px-6 lg:px-8">
      <Slider {...settings} className="techmart-featured">
        {products.map((product) => (
          <article key={product._id} className="!flex flex-col overflow-hidden rounded-2xl bg-slate-900 text-white shadow-lg md:!flex-row">
            <div className="min-w-0 md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover sm:h-72 md:h-[26rem]"
                loading="lazy"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8 md:w-1/2 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Featured product</p>
              <h2 className="mt-3 break-words text-2xl font-bold leading-tight sm:text-3xl">{product.name}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300 sm:text-base">{product.description}</p>
              <p className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                {Number(product.price).toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/product/${product._id}`} className="inline-flex items-center justify-center rounded-full bg-sky-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-300">View details</Link>
                <Link to="/shop" className="inline-flex items-center justify-center rounded-full border border-slate-500 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">Browse all</Link>
              </div>
            </div>
          </article>
        ))}
      </Slider>
    </section>
  );
};

export default ProductCarousel;
