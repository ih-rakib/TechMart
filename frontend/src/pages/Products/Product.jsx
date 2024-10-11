import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[25rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[15rem] object-cover rounded"
        />
        {/* Positioning the HeartIcon at the top-right corner of the image */}
        <div className="absolute top-2 right-2">
          <HeartIcon product={product} />
        </div>
      </div>

      {/* Link and product info appear below the image */}
      <Link to={`/product/${product._id}`} className="block mt-2">
        <div className="py-1">
          <h2 className="flex justify-between items-center">
            <div>{product?.name}</div>
            <span className="bg-slate-300 text-slate-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-slate-900 dark:text-slate-200">
              $ {product.price}
            </span>
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default Product;
