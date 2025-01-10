import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Catalogue from "../../features/catalogue/Catalogue";
import Home from "../../features/home/Home";
import Contact from "../../features/contact/Contact";
import About from "../../features/about/About";
import ProductDetails from "../../features/catalogue/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "catalogue", element: <Catalogue /> },
      { path: "catalogue/:id", element: <ProductDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <Navigate to="not-found" replace /> },
    ],
  },
]);
