import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./App.css";
import HomePage from "./components/home/HomePage";
import ManagerPage from "./components/pages/ManagerPage";
import PostmanPage from "./components/pages/PostmanPage";
import RequestListPage from "./pages/RequestListPage";
import ManagerRequestView from "./pages/ManagerRequestView";
import FactorRequestView from "./pages/FactorRequestView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/manager",
    element: <ManagerPage />,
  },
  {
    path: "/factor",
    element: <PostmanPage />,
  },
  {
    path: "/requests",
    element: <RequestListPage />,
  },
  {
    path: "/manager/request/:id",
    element: <ManagerRequestView />,
  },
  {
    path: "/factor/request/:id",
    element: <FactorRequestView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
