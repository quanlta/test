import React, { createContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import Layout from "./components/Layout";
import AboutUs from "./pages/about-us";
import AdminPage from "./admin/layouts_admin/Admin_layout";
import UserList from "./admin/pages_admin/UserList";
import UserProfile from "./admin/pages_admin/UserProfile";
import UserCreate from "./admin/pages_admin/UserCreate";
import Ecommerce from "./admin/pages_admin/Ecommerce";
import ProductList from "./admin/pages_admin/ProductList";
import ProductView from "./admin/pages_admin/ProductView";
import ProductCreate from "./admin/pages_admin/ProductCreate";
import CoffeeshopList from "./admin/pages_admin/CoffeeShopList";
import CoffeeshopView from "./admin/pages_admin/CoffeeShopView";
import CoffeeCreate from "./admin/pages_admin/CoffeeShopCreate";
import OrdersListPage from "./admin/pages_admin/OrderList";
import OrdersView from "./admin/pages_admin/OrdersView";
import Invoices from "./admin/pages_admin/Invoice";
import MessagePage from "./admin/pages_admin/Message";
import SettingsPage from "./admin/pages_admin/Settings";
import Booking from "./admin/pages_admin/Booking";
import BookingPage from "./pages/booking";
import PodsPage from "./pages/pod";
import ProductsPage from "./pages/product";
import CartPage from "./pages/cart";
import PODBookingPage from "./pages/pod-booking";
import CoffeeShopsPage2 from "./pages/shop";
import CoffeeShopsPage from "./pages/coffee-shops";
import PODBooking from "./pages/booking-page";
import SuccessPage from "./pages/success";
import PaymentPage from "./pages/payment";
import CoffeeShopDetailPage from "./pages/shopDetail";
import BookingHistoryPage from "./pages/bookingHistory";
import OrderHistoryPage from "./pages/order";
const Mycontext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [themeMode, setThemeMode] = useState(true);

  useEffect(() => {
    if (themeMode) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    }
  }, [themeMode]);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    themeMode,
    setThemeMode,
  };

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <HomePage />,
          key: "home",
        },
        {
          path: "payment",
          element: <PaymentPage />,
          key: "payment",
        },
        {
          path: "about-us",
          element: <AboutUs />,
          key: "about-us",
        },
        {
          path: "product",
          element: <ProductsPage />,
          key: "product",
        },
        {
          path: "shop",
          element: <CoffeeShopsPage2 />,
          key: "shop",
        },
        {
          path: "coffee-shops",
          element: <CoffeeShopsPage />,
          key: "coffee-shops",
        },
        {
          path: "coffee-shops/:id",
          element: <CoffeeShopDetailPage />,
          key: "coffee-shop-detail",
        },
        {
          path: "booking-history",
          element: <BookingHistoryPage />,
          key: "booking-history",
        },
        {
          path:"order-history",
          element: <OrderHistoryPage />,
          key: "order-history",
        }
      ],
    },
    {
      path: "success",
      element: <SuccessPage />,
    },

    {
      path: "pod",
      element: <PodsPage />,
    },
    {
      path: "cart",
      element: <CartPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      children: [
        {
          path: "user-list",
          element: <UserList />,
          key: "user-list",
        },
        {
          path: "user-profile/:id",
          element: <UserProfile />,
          key: "user-profile",
        },
        {
          path: "user-create",
          element: <UserCreate />,
          key: "user-create",
        },
        {
          path: "dashboard",
          element: <Ecommerce />,
          key: "dashboard",
        },
        {
          path: "product-list",
          element: <ProductList />,
          key: "product-list",
        },
        {
          path: "product-view/:id",
          element: <ProductView />,
          key: "product-view",
        },
        {
          path: "product-create",
          element: <ProductCreate />,
          key: "product-create",
        },
        {
          path: "coffeeshop-list",
          element: <CoffeeshopList />,
          key: "coffeeshop-list",
        },
        {
          path: "coffeeshop-view/:id",
          element: <CoffeeshopView />,
          key: "coffeeshop-view",
        },
        {
          path: "coffeeshop-create",
          element: <CoffeeCreate />,
          key: "coffeeshop-create",
        },
        {
          path: "orders-list",
          element: <OrdersListPage />,
          key: "orders-list",
        },
        {
          path: "orders-view/:id",
          element: <OrdersView />,
          key: "orders-view",
        },
      
        {
          path: "invoice-list",
          element: <Invoices />,
          key: "invoice-list",
        },
        {
          path: "messages",
          element: <MessagePage />,
          key: "messages",
        },
        {
          path: "settings",
          element: <SettingsPage />,
          key: "settings",
        },
        {
          path: "booking",
          element: <Booking />,
          key: "booking",
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
export { Mycontext };