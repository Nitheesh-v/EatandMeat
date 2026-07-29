import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import { Contact } from "./pages/Contact/Contact";

import "./index.css";
import MainLayout from "./layouts/MainLayout";
import { CartProvider } from "./Context/CartContext";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Offers from "./components/Offer";
import { Register } from "./pages/register/Register";
import { LocationProvider } from "./Context/LocationContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },

      {
        path: "/",
        element: <App />,
      },

      {
        path: "/products",
        element: <Products />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <LocationProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </LocationProvider>,
);
