import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={`text-${color} ml-1`}></FaStar>
      ))}

      {halfStars === 1 && (
        <FaStarHalf className={`text-${color} ml-1`}></FaStarHalf>
      )}

      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} className={`text-${color} ml-1`}></FaRegStar>
      ))}

      <span className={`rating-text ml-1 text-${color}`}>{text && text}</span>
    </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-500",
};

export default Ratings;
