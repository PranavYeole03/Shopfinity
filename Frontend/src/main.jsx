import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Bag from "./routes/Bag.jsx";
import Home from "./routes/Home.jsx";
import { Provider } from "react-redux";
import myntraStore from "./store/index.js";
import Men from "./routes/Men.jsx";
import Women from "./routes/Women.jsx";
import Kids from "./routes/Kids.jsx";
import Studio from "./routes/Studio.jsx";
import Beauty from "./routes/Beauty.jsx";
import HL from "./routes/HL.jsx";
import Profile from "./components/Profile.jsx";
import Wishlist from "./components/Wishlist.jsx";
import Checkout from "./components/Checkout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/bag", element: <Bag /> },
      { path: "/Men", element: <Men /> },
      { path: "/Women", element: <Women /> },  // fixed
      { path: "/Kids", element: <Kids /> },
      { path: "/Studio", element: <Studio /> },
      { path: "/HL", element: <HL /> },
      { path: "/Beauty", element: <Beauty /> },
      { path: "/Profile", element: <Profile /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path:"/Checkout", element:<Checkout />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
