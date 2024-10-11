import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavouriteToLocalStorage,
  getFavouritesFromLocalStorage,
  removeFavouriteFromLocalStorage,
} from "../../Utils/localStorage";
import {
  addToFavourites,
  removeFromFavourites,
  setFavourites,
} from "../../redux/features/favourites/favouriteSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites) || [];
  const isFavourite = favourites.some((p) => p._id === product._id);

  useEffect(() => {
    const favouritesFromLoaclStorage = getFavouritesFromLocalStorage();
    dispatch(setFavourites(favouritesFromLoaclStorage));
  }, []);

  const toggleFavourites = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(product));

      removeFavouriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavourites(product));
      addFavouriteToLocalStorage(product);
    }
  };

  return (
    <div
      onClick={toggleFavourites}
      className="absolute top-2 right-5 cursor-pointer"
    >
      {isFavourite ? (
        <FaHeart className="text-pink-500 text-xl"></FaHeart>
      ) : (
        <FaRegHeart className="text-slate-600 text-xl"></FaRegHeart>
      )}
    </div>
  );
};

export default HeartIcon;
