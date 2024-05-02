import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./routes/home";
import Product from "./routes/product";
import Offers from "./routes/offers";
import Cart from "./routes/cart";
import Category from "./routes/category";
import Checkout from "./routes/checkout";
import Register from "./routes/register";
import Account from "./routes/account";
import ErrorPage from "./error-page";
import Xumo from "./routes/xumo";
import KaluzaStep1 from "./routes/kaluza_step_1";
import KaluzaStep2 from "./routes/kaluza_step_2";
import KaluzaStep3 from "./routes/kaluza_step_3";
import KaluzaCart from "./routes/kaluza_cart";
import KaluzaCheckout from "./routes/kaluza_checkout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />
    }, 
    {
      path: "c/:categoryId",
      element: <Category />,
    },
    {
      path: "k/step1",
      element: <KaluzaStep1 />,
    },
    {
      path: "k/step2/:productId",
      element: <KaluzaStep2 />,
    },
    {
      path: "k/step3/:productId",
      element: <KaluzaStep3 />,
    },
    {
      path: "p/:productId",
      element: <Product />,
    },
    {
      path: "o/:productId",
      element: <Offers />,
    },
    {
      path: "xumo/:productId",
      element: <Xumo />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/kcheckout",
      element: <KaluzaCheckout />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/kcart",
      element: <KaluzaCart />,
    }
    ,
    {
      path: "/register",
      element: <Register />,
    }
    ,
    {
      path: "/account",
      element: <Account />,
    }
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);