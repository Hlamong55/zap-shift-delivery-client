import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import AboutUs from "../pages/AboutUs/AboutUs";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import NotFound from "../pages/404-Error/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
          path: "coverage",
          element: <Coverage></Coverage>,
          loader: () => fetch('/warehouses.json').then(res => res.json())
        },
        {
          path: "about",
          element: <AboutUs></AboutUs>
        },
        {
          path: "beRider",
          element: <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>,
          loader: () => fetch('/warehouses.json').then(res => res.json())
        },
        {
          path: "send-parcel",
          element: <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>,
          loader: () => fetch('/warehouses.json').then(res => res.json())
        }
    ]
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: "my-parcels",
        element: <MyParcels></MyParcels>
      },
      {
        path: "payment/:parcelId",
        element: <Payment></Payment>
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "approve-riders",
        element: <ApproveRiders></ApproveRiders>
      },
      {
        path: "users-manage",
        element: <UsersManagement></UsersManagement>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound></NotFound>
  }
]);