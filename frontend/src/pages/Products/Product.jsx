import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-sm p-3 sm:max-w-none">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full rounded object-cover sm:h-56"
        />
        <div className="absolute right-2 top-2">
          <HeartIcon product={product} />
        </div>
      </div>

      <Link to={`/product/${product._id}`} className="mt-2 block">
        <div className="py-1">
          <h2 className="flex min-w-0 items-start justify-between gap-2">
            <span className="min-w-0 break-words font-medium">{product?.name}</span>
            <span className="shrink-0 rounded-full bg-slate-300 px-2.5 py-0.5 text-sm font-medium text-slate-800 dark:bg-slate-900 dark:text-slate-200">
              $ {product.price}
            </span>
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default Product;
