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
        },
        {
          path: "payment",
          element: <PaymentPage />,
        },
        {
          path: "about-us",
          element: <AboutUs />,
        },
        {
          path: "product",
          element: <ProductsPage />,
        },
        {
          path: "shop",
          element: <CoffeeShopsPage2 />,
        },
        {
          path: "coffee-shops",
          element: <CoffeeShopsPage />,
        },
        {
          path: "coffee-shops/:id",
          element: <CoffeeShopDetailPage />,
        },
        {
          path: "booking-history",
          element: <BookingHistoryPage />,
        },
        {
          path:"order-history",
          element: <OrderHistoryPage />,
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
      element: <RegisterPage />,
    },
    {
      path: "admin",
      element: (
        <Mycontext.Provider value={values}>
          <AdminPage />
        </Mycontext.Provider>
      ),
      children: [
        {
          path: "user-list",
          element: <UserList />,
        },
        {
          path: "user-profile/:id",
          element: <UserProfile />,
        },
        {
          path: "user-create",
          element: <UserCreate />,
        },
        {
          path: "dashboard",
          element: <Ecommerce />,
        },
        {
          path: "product-list",
          element: <ProductList />,
        },
        {
          path: "product-view/:id",
          element: <ProductView />,
        },
        {
          path: "product-create",
          element: <ProductCreate />,
        },
        {
          path: "coffeeshop-list",
          element: <CoffeeshopList />,
        },
        {
          path: "coffeeshop-view/:id",
          element: <CoffeeshopView />,
        },
        {
          path: "coffeeshop-create",
          element: <CoffeeCreate />,
        },
        {
          path: "orders-list",
          element: <OrdersListPage />,
        },
        {
          path: "orders-view/:id",
          element: <OrdersView />,
        },

        {
          path: "invoice-list",
          element: <Invoices />,
        },
        {
          path: "messages",
          element: <MessagePage />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
        {
          path: "booking",
          element: <Booking />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
export { Mycontext };