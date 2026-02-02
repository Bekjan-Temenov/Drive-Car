import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import Layout from "../../widgets/layout/Layout";
import DataCarsPage from "../../pages/DataCarsPage";
import FavoritePage from "../../pages/FavoritePage";
import CarsPage from "../../pages/CarsPage";
import AboutPage from "../../pages/AboutPage";
import SignUpPage from "../../pages/SignUpPage";
import Layouts from "../../widgets/adminLayout/Layouts";
import CarsPageadmin from "../../pages/admin/CarsPage";
import AdverstisementPage from "../../pages/admin/AdverstisementPage";
import Auth from "../../components/admin/auth/Auth";
import NotFoundPage from "../../pages/NotFoundPage";
import NotFound from "../../pages/admin/NotFound";
import ReviewsPage from "../../pages/admin/ReviewsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/data-cars/:id",
        element: <DataCarsPage />,
      },
      {
        path: "/favorites",
        element: <FavoritePage />,
      },
      {
        path: "/cars",
        element: <CarsPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [],
  },
  {
    path: "/admin/sign-in",
    element: <Auth />,
  },
  {
    path: "/admin",
    element: <Layouts />,
    children: [
      {
        path: "/admin",
        element: <CarsPageadmin />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/admin/advertisements",
        element: <AdverstisementPage />,
      },
      {
        path: "/admin/reviews",
        element: <ReviewsPage />,
      },
    ],
  },
]);
