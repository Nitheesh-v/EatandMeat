import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "./mmthemes.css";
import App from "./App";
import MainLayout from "./layouts/MainLayout";

// Context
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import { LocationProvider } from "./Context/LocationContext";
import { OrderProvider } from "./Context/OrderContext";

// Customer Pages
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import { TrackOrder } from "./pages/TrackOrder/TrackOrder";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import { Contact } from "./pages/Contact/Contact";

// Company Pages
import Dashboard from "./pages/Company/Dashboard";
import Orders from "./pages/Company/Orders";
import Preparing from "./pages/Company/Preparing";
import Packed from "./pages/Company/Packed";
import { DeliveryPartners } from "./pages/Company/DeliveryPartners";
import Reports from "./pages/Company/Reports";

// Components
import DeliveryModal from "./components/Delivery/DeliveryModal";
import CompanyLayout from "./pages/Company/CompanyLayout";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { MyOrders } from "./pages/MyOrders/MyOrders";

// Delivery Pages
import DeliveryLayout from "./pages/Delivery/DeliveryLayout.jsx";
import { DeliveryDashboard } from "./pages/Delivery/DeliveryDashboard.jsx";
import { AvailableOrders } from "./pages/Delivery/AvailableOrders";
import { MyDeliveries } from "./pages/Delivery/MyDeliveries";
import { Earnings } from "./pages/Delivery/Earnings";
import { Profile } from "./pages/Delivery/Profile";
import Withdraw from "./pages/Delivery/Withdraw";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminInventory from "./pages/Admin/AdminInventory";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminCustomers from "./pages/Admin/AdminCustomers";
import AdminDeliveryPartners from "./pages/Admin/AdminDeliveryPartners";
import AdminReports from "./pages/Admin/AdminReports";
import AdminCoupons from "./pages/Admin/AdminCoupons";

import "leaflet/dist/leaflet.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // ==========================
      // Public Routes
      // ==========================
      {
        index: true,
        element: <App />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "locavailable",
        element: <DeliveryModal />,
      },

      // ==========================
      // Customer Protected Routes
      // ==========================
      {
        element: <ProtectedRoute allowedRoles={["customer"]} />,
        children: [
          {
            path: "cart",
            element: <Cart />,
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
            path: "track-order",
            element: <TrackOrder />,
          },
          {
            path: "my-orders",
            element: <MyOrders />,
          },
        ],
      },

      // ==========================
      // Company Protected Routes
      // ==========================
      {
        path: "company",
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <CompanyLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "preparing",
            element: <Preparing />,
          },
          {
            path: "packed",
            element: <Packed />,
          },
          {
            path: "delivery-partners",
            element: <DeliveryPartners />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
        ],
      },

      // ==========================
      // Delivery Protected Routes
      // ==========================
      {
        element: <ProtectedRoute allowedRoles={["delivery"]} />,
        children: [
          {
            path: "delivery",
            element: <DeliveryLayout />,
            children: [
              {
                path: "dashboard",
                element: <DeliveryDashboard />,
              },
              {
                path: "available-orders",
                element: <AvailableOrders />,
              },
              {
                path: "my-deliveries",
                element: <MyDeliveries />,
              },
              {
                path: "earnings",
                element: <Earnings />,
              },
              {
                path: "withdraw",
                element: <Withdraw />,
              },
              {
                path: "profile",
                element: <Profile />,
              },
            ],
          },
        ],
      },

      // ==========================
      // Admin Protected Routes
      // ==========================
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "products/add",
            element: <AdminAddProduct />,
          },
          {
            path: "categories",
            element: <AdminCategories />,
          },
          {
            path: "inventory",
            element: <AdminInventory />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "customers",
            element: <AdminCustomers />,
          },
          {
            path: "delivery-partners",
            element: <AdminDeliveryPartners />,
          },
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            path: "reports",
            element: <AdminReports />,
          },
          {
            path: "coupons",
            element: <AdminCoupons />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <LocationProvider>
      <CartProvider>
        <OrderProvider>
          <RouterProvider router={router} />
        </OrderProvider>
      </CartProvider>
    </LocationProvider>
  </AuthProvider>
);
