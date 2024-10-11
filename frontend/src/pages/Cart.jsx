import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const { cartItems } = cart;

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div className="inline-flex">
            Your Cart is empty
            <Link
              to="/shop"
              className="flex items-center font-semibold hover:underline ml-4 text-gray-800"
            >
              <AiOutlineArrowLeft className="mr-2 text-gray-800" /> Go To Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:w-1/2">
              <h1 className="text-2xl font-semibold mb-4"> Shopping Cart</h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center mb-[1rem] pb-2"
                >
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-blue-800">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-slate-500">{item.brand}</div>
                    <div className="mt-2 text-slate-500 font-bold">
                      $ {item.price}
                    </div>
                  </div>
                  <div className="w-24">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      className="w-full p-1 border rounded"
                    >
                      <option value="">Select</option>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="text-red-500 mr-[5rem]"
                    >
                      <FaTrash className="ml-[1rem]"></FaTrash>
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items: (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  </h2>

                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </div>

                  <button
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                    className="text-white bg-slate-700 hover:bg-slate-800 mt-4 py-2 px-4 rounded-full text-lg w-full"
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
