import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-48 w-full object-cover rounded"
        />

        <div className="absolute top-1 right-[-7px]">
          <HeartIcon product={product} />
        </div>
      </div>

      <Link to={`/product/${product._id}`} className="block relative">
        <div className="py-1">
          <h2 className="flex justify-between items-center">
            <div>{product?.name}</div>
            <span className="bg-slate-300 text-slate-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-slate-900 dark:text-slate-200">
              ${product.price}
            </span>
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default SmallProduct;
