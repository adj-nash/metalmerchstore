import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Catalogue from "../../features/catalogue/Catalogue";
import Home from "../../features/home/Home";
import Contact from "../../features/contact/Contact";
import About from "../../features/about/About";
import ProductDetails from "../../features/catalogue/ProductDetails";
import Basket from "../../features/basket/Basket";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RegistrationSuccess from "../../features/account/RegistrationSuccess";
import UserAuth from "./UserAuth";
import Checkout from "../../features/checkout/Checkout";
import CheckoutSuccess from "../../features/checkout/CheckoutSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {element: <UserAuth/>, children: [
        {path: "checkout", element: <Checkout/>},
        {path: "checkout/success", element: <CheckoutSuccess/>}
      ]},
      { path: "", element: <Home /> },
      { path: "catalogue", element: <Catalogue /> },
      { path: "catalogue/:id", element: <ProductDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "*", element: <Navigate to="not-found" replace /> },
      { path: "basket", element: <Basket /> },
      { path: "registrationsuccess", element: <RegistrationSuccess /> },
    ],
  },
]);
