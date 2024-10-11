import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "../pages/User/Profile";
import AdminRoute from "../pages/Admin/AdminRoute";
import Home from "../pages/Home";
import UserList from "../pages/Admin/UserList";
import CategoryList from "../pages/Admin/CategoryList";
import ProductList from "../pages/Admin/ProductList";
import ProductUpdate from "../pages/Admin/ProductUpdate";
import AllProducts from "../pages/Admin/AllProducts";
import Favourites from "../pages/Products/Favourites";
import ProductDetails from "../pages/Products/ProductDetails";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/",
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/favourite",
        element: <Favourites></Favourites>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        element: <PrivateRoute></PrivateRoute>,
        children: [
          {
            path: "profile",
            element: <Profile></Profile>,
          },
        ],
      },

      // ADMIN ROUTES
      {
        path: "/admin",
        element: <AdminRoute></AdminRoute>,
        children: [
          {
            path: "userlist",
            element: <UserList></UserList>,
          },
          {
            path: "categorylist",
            element: <CategoryList></CategoryList>,
          },
          {
            path: "allProducts",
            element: <AllProducts></AllProducts>,
          },
          {
            path: "productlist",
            element: <ProductList></ProductList>,
          },
          {
            path: "product/update/:_id",
            element: <ProductUpdate></ProductUpdate>,
          },
        ],
      },
    ],
  },
]);
export default router;
