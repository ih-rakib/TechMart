import { useSelector } from "react-redux";
import { selectFavouriteProduct } from "../../redux/features/favourites/favouriteSlice";
import Product from "./Product";

const Favourites = () => {
  const favourites = useSelector(selectFavouriteProduct);
  console.log(favourites);

  return (
    <div className="ml-[10rem]">
      <h1 className="font-bold text-lg ml-[3rem] mt-[3rem]">
        FAVOURITE PRODUCTS
      </h1>

      <div className="flex flex-wrap">
        {favourites.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
